export enum DiffType {
    Unchanged = 0,
    Added = 1 << 0,
    Removed = 1 << 1,
    Modified = 1 << 2,
    TypeChanged = 1 << 3,
    Uncomparable = 1 << 20
}

export interface IDiffResult<T> {
    oldValue: T;
    newValue: T;
    changeType: DiffType;
}

export interface IArrayDiffResult<T> extends IDiffResult<T[]> {
    addedItems: T[];
    removedItems: T[];
    unchangedItems: T[];
    changedItems: IDiffResult<T>[];
}

export function updateValue<T>(object: T, diff: IDiffResult<T>, fieldName: string) {
    if (!object[fieldName]) {
        // invalid field name - unable to change non-existant field
        return;
    }
    if (!diff[fieldName]) {
        // field is not changed as it's not in the diff result
        return;
    }

    if (diff[fieldName]) {
        object[fieldName] = diff[fieldName].newValue;
    }
}

export function updateValues<T>(object: T, diff: IDiffResult<T>, ...fieldNames: string[]) {
    fieldNames.forEach(fieldName => updateValue(object, diff, fieldName));
}

export class GenericDiff {

    static getDifference<T>(oldValue: T, newValue: T, name?: string, keyExtractors?: { [key: string]: (item: any) => string }): IDiffResult<T> {
        const left = oldValue;
        const right = newValue;

        // handle undefined values
        if (left === undefined) {
            if (right === undefined) {
                return {
                    oldValue: undefined,
                    newValue: undefined,
                    changeType: DiffType.Unchanged
                };
            }
            return {
                oldValue: undefined,
                newValue: right,
                changeType: right === null ? DiffType.Modified : DiffType.Added
            };

        }
        if (right === undefined) {
            return {
                oldValue: left,
                newValue: undefined,
                changeType: left === null ? DiffType.Modified : DiffType.Removed
            };
        }

        // handle null values
        if (left === null) {
            if (right === null) {
                return {
                    oldValue: null,
                    newValue: null,
                    changeType: DiffType.Unchanged
                };
            }
            return {
                oldValue: null,
                newValue: right,
                changeType: DiffType.Added
            };

        }
        if (right === null) {
            return {
                oldValue: left,
                newValue: null,
                changeType: DiffType.Removed
            };
        }

        // handle base types
        const leftType = typeof left;
        const rightType = typeof right;

        if (leftType !== rightType) {
            return {
                oldValue: oldValue,
                newValue: newValue,
                changeType: DiffType.TypeChanged
            };
        }

        // are they primitives?
        if (leftType !== "object") {
            return {
                oldValue: left,
                newValue: right,
                changeType: (left === right) ? DiffType.Unchanged : DiffType.Modified
            };
        }

        // base case - are their serializations equal
        const leftJson = JSON.stringify(left);
        const rightJson = JSON.stringify(right);

        if (leftJson === rightJson) {
            return {
                oldValue: left,
                newValue: right,
                changeType: DiffType.Unchanged
            };
        }

        // the values are objects, and they have different serializations
        // are they arrays?
        if (Array.isArray(left)) {
            if (Array.isArray(right)) {
                return <IDiffResult<T>><any>(this.getArrayDifference(<any>left, <any>right, name, keyExtractors));
            } else {
                return {
                    oldValue: <T><any>left,
                    newValue: right,
                    changeType: DiffType.TypeChanged
                };
            }
        }
        if (Array.isArray(right)) {
            return {
                oldValue: left,
                newValue: <T><any>right,
                changeType: DiffType.TypeChanged
            };
        }

        // compare object properties by name
        const allKeyNames = Object.keys(left).concat(Object.keys(right));
        const result: IDiffResult<T> = {
            oldValue: left,
            newValue: right,
            changeType: DiffType.Uncomparable
        };

        for (let index = 0; index < allKeyNames.length; index += 1) {
            const propName = allKeyNames[index];
            const diff = this.getDifference(left[propName], right[propName], propName, keyExtractors);
            if (diff.changeType !== DiffType.Unchanged) {
                result[propName] = diff;
            }
        }

        // are there any changes
        if (allKeyNames.some(key => result[key] && result[key].changeType !== DiffType.Unchanged)) {
            result.changeType = DiffType.Modified;
            return result;
        }

        return {
            oldValue: left,
            newValue: right,
            changeType: DiffType.Unchanged
        };

    }

    static getArrayDifference<T>(leftArray: T[], rightArray: T[], name?: string, keyExtractors?: { [key: string]: (item: any) => string }): IArrayDiffResult<T> {
        const addedItems = rightArray.slice();
        const unchangedItems: T[] = [];
        const removedItems: T[] = [];
        const changedItems: IDiffResult<T>[] = [];

        if (keyExtractors && keyExtractors[name]) {
            // we're using key matching
            const keyGetter = keyExtractors[name];
            for (let lindex = 0; lindex < leftArray.length; lindex++) {
                const litem = leftArray[lindex];
                const lkey = keyGetter(litem);
                const rindex = addedItems.findIndex(r => keyGetter(r) === lkey);
                const ritem = addedItems[rindex];
                if (!ritem) {
                    removedItems.push(litem);
                } else {
                    addedItems.splice(rindex, 1);
                    const diff = this.getDifference(litem, ritem, name, keyExtractors);
                    if (diff.changeType === DiffType.Unchanged) {
                        unchangedItems.push(ritem);
                    } else {
                        changedItems.push(diff);
                    }
                }
            };
        } else {
            // we're using full object matching
            for (let lindex = 0; lindex < leftArray.length; lindex++) {
                const left = leftArray[lindex];
                let found = false;
                for (let rindex = 0; rindex < addedItems.length; rindex++) {
                    const right = addedItems[rindex];
                    if (this.getDifference(left, right, name, keyExtractors).changeType === DiffType.Unchanged) {
                        unchangedItems.push(right);
                        addedItems.splice(rindex, 1);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    removedItems.push(left);
                }
            }
        }

        let changeType: DiffType = DiffType.Unchanged;
        if (addedItems.length !== 0) {
            changeType = changeType | DiffType.Added;
        }
        if (removedItems.length !== 0) {
            changeType = changeType | DiffType.Removed;
        }
        if (changedItems.length !== 0) {
            changeType = changeType | DiffType.Modified;
        }

        return {
            oldValue: leftArray,
            newValue: rightArray,
            addedItems: addedItems,
            removedItems: removedItems,
            unchangedItems: unchangedItems,
            changedItems: changedItems,
            changeType: changeType
        };
    }
}
