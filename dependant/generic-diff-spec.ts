import { GenericDiff, DiffType } from "./generic-diff";

describe("Generic difference calculator", () => {

    it('verifies that generic diff of two undefineds returns that nothing is changed', () => {
        // 1. Arrange
        const oldValue = undefined;
        const newValue = undefined;
        const expected = {
            oldValue: undefined,
            newValue: undefined,
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of undefined and value returns that value is Added', () => {
        // 1. Arrange
        const oldValue = undefined;
        const newValue = "some-value";
        const expected = {
            oldValue: undefined,
            newValue: "some-value",
            changeType: DiffType.Added
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of value and undefined returns that value is Removed', () => {
        // 1. Arrange
        const oldValue = "some-value";
        const newValue = undefined;
        const expected = {
            oldValue: "some-value",
            newValue: undefined,
            changeType: DiffType.Removed
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of two nulls returns that nothing is changed', () => {
        // 1. Arrange
        const oldValue = null;
        const newValue = null;
        const expected = {
            oldValue: null,
            newValue: null,
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of null and value returns that value is Added', () => {
        // 1. Arrange
        const oldValue = null;
        const newValue = "some-value";
        const expected = {
            oldValue: null,
            newValue: "some-value",
            changeType: DiffType.Added
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of value and null returns that value is Removed', () => {
        // 1. Arrange
        const oldValue = "some-value";
        const newValue = null;
        const expected = {
            oldValue: "some-value",
            newValue: null,
            changeType: DiffType.Removed
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of undefined and null returns that value is Modified', () => {
        // 1. Arrange
        const oldValue = undefined;
        const newValue = null;
        const expected = {
            oldValue: undefined,
            newValue: null,
            changeType: DiffType.Modified
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of null and undefined returns that value is Modified', () => {
        // 1. Arrange
        const oldValue = null;
        const newValue = undefined;
        const expected = {
            oldValue: null,
            newValue: undefined,
            changeType: DiffType.Modified
        };

        // 2. Act
        const actual = GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that generic diff of string and number returns that value is TypeChanged', () => {
        // 1. Arrange
        const oldValue = "5";
        const newValue = 5;
        const expected = {
            oldValue: "5",
            newValue: 5,
            changeType: DiffType.TypeChanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two objects with same properties in the same order result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100
        };
        const newValue = {
            first: "string",
            second: 100
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                first: "string",
                second: 100
            },
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two complex objects with same properties in the same order result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100,
            inner: {
                value: "something"
            }
        };
        const newValue = {
            first: "string",
            second: 100,
            inner: {
                value: "something"
            }
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100,
                inner: {
                    value: "something"
                }
            },
            newValue: {
                first: "string",
                second: 100,
                inner: {
                    value: "something"
                }
            },
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two objects with same properties in different order result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100
        };
        const newValue = {
            second: 100,
            first: "string"
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                second: 100,
                first: "string"
            },
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two complex objects with same properties in different order result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        const newValue = {
            inner: {
                index: 0,
                text: "something"
            },
            second: 100,
            first: "string",
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100,
                inner: {
                    text: "something",
                    index: 0
                }
            },
            newValue: {
                inner: {
                    index: 0,
                    text: "something"
                },
                second: 100,
                first: "string",
            },
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two objects with same properties, different values in the same order result in an Modified result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100
        };
        const newValue = {
            first: "string",
            second: 200
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                first: "string",
                second: 200
            },
            changeType: DiffType.Modified,
            second: {
                oldValue: 100,
                newValue: 200,
                changeType: DiffType.Modified
            }
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two complex objects with same properties with different outer values in different order result in an correct modified result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        const newValue = {
            inner: {
                index: 0,
                text: "something"
            },
            second: 101,
            first: "string",
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100,
                inner: {
                    text: "something",
                    index: 0
                }
            },
            newValue: {
                inner: {
                    index: 0,
                    text: "something"
                },
                second: 101,
                first: "string",
            },
            changeType: DiffType.Modified,
            second: {
                oldValue: 100,
                newValue: 101,
                changeType: DiffType.Modified
            }
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two complex objects with same properties with different inner values in different order result in an correct modified result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        const newValue = {
            inner: {
                index: 1,
                text: "something"
            },
            second: 100,
            first: "string",
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100,
                inner: {
                    text: "something",
                    index: 0
                }
            },
            newValue: {
                inner: {
                    index: 1,
                    text: "something"
                },
                second: 100,
                first: "string",
            },
            changeType: DiffType.Modified,
            inner: {
                oldValue: { text: 'something', index: 0 },
                newValue: { index: 1, text: 'something' },
                changeType: DiffType.Modified,
                index: {
                    oldValue: 0,
                    newValue: 1,
                    changeType: DiffType.Modified
                }
            }
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two objects with different properties result in an Modified result', () => {
        // 1. Arrange
        const oldValue = {
            first: "string",
            second: 100
        };
        const newValue = {
            second: 200,
            third: true
        };
        const expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                second: 200,
                third: true
            },
            changeType: DiffType.Modified,
            first: {
                oldValue: "string",
                newValue: undefined,
                changeType: DiffType.Removed
            },
            second: {
                oldValue: 100,
                newValue: 200,
                changeType: DiffType.Modified
            },
            third: {
                oldValue: undefined,
                newValue: true,
                changeType: DiffType.Added
            }
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that array / object comparison results in a TypeChanged result', () => {
        // 1. Arrange
        const oldValue = [1, 4, 9, 16];
        const newValue = { property: "value" };
        const expected = {
            oldValue: [1, 4, 9, 16],
            newValue: { property: "value" },
            changeType: DiffType.TypeChanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that object / array comparison results in a TypeChanged result', () => {
        // 1. Arrange
        const oldValue = { property: "value" };
        const newValue = [1, 4, 9, 16];
        const expected = {
            oldValue: { property: "value" },
            newValue: [1, 4, 9, 16],
            changeType: DiffType.TypeChanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays with same primitive values result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = [1, 4, 9, 16];
        const newValue = [1, 4, 9, 16];
        const expected = {
            oldValue: [1, 4, 9, 16],
            newValue: [1, 4, 9, 16],
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays, where the old has less elements will result in a Added result', () => {
        // 1. Arrange
        const oldValue = [1, 4, 9];
        const newValue = [1, 4, 9, 16];
        const expected = {
            oldValue: [1, 4, 9],
            newValue: [1, 4, 9, 16],
            addedItems: [16],
            removedItems: [],
            unchangedItems: [1, 4, 9],
            changedItems: [],
            changeType: DiffType.Added
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays, where the old has more elements will result in a Removed result', () => {
        // 1. Arrange
        const oldValue = [1, 4, 9, 16, 25];
        const newValue = [1, 4, 9, 16];
        const expected = {
            oldValue: [1, 4, 9, 16, 25],
            newValue: [1, 4, 9, 16],
            addedItems: [],
            removedItems: [25],
            unchangedItems: [1, 4, 9, 16],
            changedItems: [],
            changeType: DiffType.Removed
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays with same complex values result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        const newValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        const expected = {
            oldValue: [
                { index: 0, value: "first-value" },
                { index: 1, value: "second-value" },
            ],
            newValue: [
                { index: 0, value: "first-value" },
                { index: 1, value: "second-value" },
            ],
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays with same complex values (different property order) result in an unchanged result', () => {
        // 1. Arrange
        const oldValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        const newValue = [
            { value: "first-value", index: 0 },
            { value: "second-value", index: 1 },
        ];
        const expected = {
            oldValue: [
                { index: 0, value: "first-value" },
                { index: 1, value: "second-value" },
            ],
            newValue: [
                { value: "first-value", index: 0 },
                { value: "second-value", index: 1 },
            ],
            addedItems: [],
            removedItems: [],
            changedItems: [],
            unchangedItems: [
                { value: 'first-value', index: 0 },
                { value: 'second-value', index: 1 }
            ],
            changeType: DiffType.Unchanged
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays with different primitive values result in an modified result', () => {
        // 1. Arrange
        const oldValue = [1, 4, 9, 16];
        const newValue = [1, 4, 16, 25];
        const expected = {
            oldValue: [1, 4, 9, 16],
            newValue: [1, 4, 16, 25],
            addedItems: [25],
            removedItems: [9],
            unchangedItems: [1, 4, 16],
            changedItems: [],
            changeType: DiffType.Added | DiffType.Removed
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two arrays with payload changes detects changes using key extractors', () => {
        // 1. Arrange
        const oldValue = [
            { key: 1, payload: "one" },
            { key: 2, payload: "two" },
            { key: 3, payload: "three" },
        ];
        const newValue = [
            { key: 0, payload: "zero" },
            { key: 1, payload: "one" },
            { key: 2, payload: "two" },
            { key: 3, payload: "four" },
        ];
        const keyExtractor: { [key: string]: (item: any) => string } = {
            items: (item) => item.key,
        };
        const expected = {
            oldValue: [
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "three" },
            ],
            newValue: [
                { key: 0, payload: "zero" },
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "four" },
            ],
            addedItems: [{ key: 0, payload: "zero" }],
            removedItems: [],
            changedItems: [{
                oldValue: { key: 3, payload: "three" },
                newValue: { key: 3, payload: "four" },
                changeType: DiffType.Modified,
                payload: { oldValue: 'three', newValue: 'four', changeType: DiffType.Modified }
            }],
            unchangedItems: [
                { key: 1, payload: "one" },
                { key: 2, payload: "two" }
            ],
            changeType: DiffType.Modified | DiffType.Added
        };

        // 2. Act
        const actual = GenericDiff.getArrayDifference<any>(oldValue, newValue, "items", keyExtractor);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it('verifies that two objects with array properties with payload changes detects changes using key extractors', () => {
        // 1. Arrange
        const oldValue = {
            items: [
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "three" },
            ]
        };
        const newValue = {
            items: [
                { key: 0, payload: "zero" },
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "four" },
            ]
        };
        const keyExtractor: { [key: string]: (item: any) => string } = {
            items: (item) => item.key,
        };
        const expected = {
            oldValue: {
                items: [{ key: 1, payload: 'one' }, { key: 2, payload: 'two' }, { key: 3, payload: 'three' }]
            },
            newValue: {
                items: [{ key: 0, payload: 'zero' }, { key: 1, payload: 'one' }, { key: 2, payload: 'two' }, { key: 3, payload: 'four' }]
            },
            changeType: DiffType.Modified,
            items: {
                oldValue: [
                    { key: 1, payload: "one" },
                    { key: 2, payload: "two" },
                    { key: 3, payload: "three" },
                ],
                newValue: [
                    { key: 0, payload: "zero" },
                    { key: 1, payload: "one" },
                    { key: 2, payload: "two" },
                    { key: 3, payload: "four" },
                ],
                addedItems: [{ key: 0, payload: "zero" }],
                removedItems: [],
                changedItems: [{
                    oldValue: { key: 3, payload: "three" },
                    newValue: { key: 3, payload: "four" },
                    changeType: DiffType.Modified,
                    payload: { oldValue: 'three', newValue: 'four', changeType: DiffType.Modified }
                }],
                unchangedItems: [
                    { key: 1, payload: "one" },
                    { key: 2, payload: "two" }
                ],
                changeType: DiffType.Modified | DiffType.Added
            }
        };

        // 2. Act
        const actual = GenericDiff.getDifference<any>(oldValue, newValue, "", keyExtractor);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

});

