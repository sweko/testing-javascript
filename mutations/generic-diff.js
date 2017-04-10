var exports = {};
var DiffType;
(function (DiffType) {
    DiffType[DiffType["Unchanged"] = 0] = "Unchanged";
    DiffType[DiffType["Added"] = 1] = "Added";
    DiffType[DiffType["Removed"] = 2] = "Removed";
    DiffType[DiffType["Modified"] = 4] = "Modified";
    DiffType[DiffType["TypeChanged"] = 8] = "TypeChanged";
    DiffType[DiffType["Uncomparable"] = 1048576] = "Uncomparable";
})(DiffType = exports.DiffType || (exports.DiffType = {}));

var GenericDiff = (function () {
    function GenericDiff() {
    }
    GenericDiff.getDifference = function (oldValue, newValue, name, keyExtractors) {
        var left = oldValue;
        var right = newValue;
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
        var leftType = typeof left;
        var rightType = typeof right;
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
        var leftJson = JSON.stringify(left);
        var rightJson = JSON.stringify(right);
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
                return (this.getArrayDifference(left, right, name, keyExtractors));
            }
            else {
                return {
                    oldValue: left,
                    newValue: right,
                    changeType: DiffType.TypeChanged
                };
            }
        }
        if (Array.isArray(right)) {
            return {
                oldValue: left,
                newValue: right,
                changeType: DiffType.TypeChanged
            };
        }
        // compare object properties by name
        var allKeyNames = Object.keys(left).concat(Object.keys(right));
        var result = {
            oldValue: left,
            newValue: right,
            changeType: DiffType.Uncomparable
        };
        for (var index = 0; index < allKeyNames.length; index += 1) {
            var propName = allKeyNames[index];
            var diff = this.getDifference(left[propName], right[propName], propName, keyExtractors);
            if (diff.changeType !== DiffType.Unchanged) {
                result[propName] = diff;
            }
        }
        // are there any changes
        if (allKeyNames.some(function (key) { return result[key] && result[key].changeType !== DiffType.Unchanged; })) {
            result.changeType = DiffType.Modified;
            return result;
        }
        return {
            oldValue: left,
            newValue: right,
            changeType: DiffType.Unchanged
        };
    };
    GenericDiff.getArrayDifference = function (leftArray, rightArray, name, keyExtractors) {
        var addedItems = rightArray.slice();
        var unchangedItems = [];
        var removedItems = [];
        var changedItems = [];
        if (keyExtractors && keyExtractors[name]) {
            // we're using key matching
            var keyGetter_1 = keyExtractors[name];
            var _loop_1 = function (lindex) {
                var litem = leftArray[lindex];
                var lkey = keyGetter_1(litem);
                var rindex = addedItems.findIndex(function (r) { return keyGetter_1(r) === lkey; });
                var ritem = addedItems[rindex];
                if (!ritem) {
                    removedItems.push(litem);
                }
                else {
                    addedItems.splice(rindex, 1);
                    var diff = this_1.getDifference(litem, ritem, name, keyExtractors);
                    if (diff.changeType === DiffType.Unchanged) {
                        unchangedItems.push(ritem);
                    }
                    else {
                        changedItems.push(diff);
                    }
                }
            };
            var this_1 = this;
            for (var lindex = 0; lindex < leftArray.length; lindex++) {
                _loop_1(lindex);
            }
            ;
        }
        else {
            // we're using full object matching
            for (var lindex = 0; lindex < leftArray.length; lindex++) {
                var left = leftArray[lindex];
                var found = false;
                for (var rindex = 0; rindex < addedItems.length; rindex++) {
                    var right = addedItems[rindex];
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
        var changeType = DiffType.Unchanged;
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
    };
    return GenericDiff;
}());
exports.GenericDiff = GenericDiff;
