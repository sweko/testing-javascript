"use strict";
exports.__esModule = true;
var generic_diff_1 = require("./generic-diff");
describe("Generic difference calculator", function () {
    it('verifies that generic diff of two undefineds returns that nothing is changed', function () {
        // 1. Arrange
        var oldValue = undefined;
        var newValue = undefined;
        var expected = {
            oldValue: undefined,
            newValue: undefined,
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of undefined and value returns that value is Added', function () {
        // 1. Arrange
        var oldValue = undefined;
        var newValue = "some-value";
        var expected = {
            oldValue: undefined,
            newValue: "some-value",
            changeType: generic_diff_1.DiffType.Added
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of value and undefined returns that value is Removed', function () {
        // 1. Arrange
        var oldValue = "some-value";
        var newValue = undefined;
        var expected = {
            oldValue: "some-value",
            newValue: undefined,
            changeType: generic_diff_1.DiffType.Removed
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of two nulls returns that nothing is changed', function () {
        // 1. Arrange
        var oldValue = null;
        var newValue = null;
        var expected = {
            oldValue: null,
            newValue: null,
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of null and value returns that value is Added', function () {
        // 1. Arrange
        var oldValue = null;
        var newValue = "some-value";
        var expected = {
            oldValue: null,
            newValue: "some-value",
            changeType: generic_diff_1.DiffType.Added
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of value and null returns that value is Removed', function () {
        // 1. Arrange
        var oldValue = "some-value";
        var newValue = null;
        var expected = {
            oldValue: "some-value",
            newValue: null,
            changeType: generic_diff_1.DiffType.Removed
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of undefined and null returns that value is Modified', function () {
        // 1. Arrange
        var oldValue = undefined;
        var newValue = null;
        var expected = {
            oldValue: undefined,
            newValue: null,
            changeType: generic_diff_1.DiffType.Modified
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of null and undefined returns that value is Modified', function () {
        // 1. Arrange
        var oldValue = null;
        var newValue = undefined;
        var expected = {
            oldValue: null,
            newValue: undefined,
            changeType: generic_diff_1.DiffType.Modified
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that generic diff of string and number returns that value is TypeChanged', function () {
        // 1. Arrange
        var oldValue = "5";
        var newValue = 5;
        var expected = {
            oldValue: "5",
            newValue: 5,
            changeType: generic_diff_1.DiffType.TypeChanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two objects with same properties in the same order result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100
        };
        var newValue = {
            first: "string",
            second: 100
        };
        var expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                first: "string",
                second: 100
            },
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two complex objects with same properties in the same order result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100,
            inner: {
                value: "something"
            }
        };
        var newValue = {
            first: "string",
            second: 100,
            inner: {
                value: "something"
            }
        };
        var expected = {
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
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two objects with same properties in different order result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100
        };
        var newValue = {
            second: 100,
            first: "string"
        };
        var expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                second: 100,
                first: "string"
            },
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two complex objects with same properties in different order result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        var newValue = {
            inner: {
                index: 0,
                text: "something"
            },
            second: 100,
            first: "string"
        };
        var expected = {
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
                first: "string"
            },
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two objects with same properties, different values in the same order result in an Modified result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100
        };
        var newValue = {
            first: "string",
            second: 200
        };
        var expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                first: "string",
                second: 200
            },
            changeType: generic_diff_1.DiffType.Modified,
            second: {
                oldValue: 100,
                newValue: 200,
                changeType: generic_diff_1.DiffType.Modified
            }
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two complex objects with same properties with different outer values in different order result in an correct modified result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        var newValue = {
            inner: {
                index: 0,
                text: "something"
            },
            second: 101,
            first: "string"
        };
        var expected = {
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
                first: "string"
            },
            changeType: generic_diff_1.DiffType.Modified,
            second: {
                oldValue: 100,
                newValue: 101,
                changeType: generic_diff_1.DiffType.Modified
            }
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two complex objects with same properties with different inner values in different order result in an correct modified result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100,
            inner: {
                text: "something",
                index: 0
            }
        };
        var newValue = {
            inner: {
                index: 1,
                text: "something"
            },
            second: 100,
            first: "string"
        };
        var expected = {
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
                first: "string"
            },
            changeType: generic_diff_1.DiffType.Modified,
            inner: {
                oldValue: { text: 'something', index: 0 },
                newValue: { index: 1, text: 'something' },
                changeType: generic_diff_1.DiffType.Modified,
                index: {
                    oldValue: 0,
                    newValue: 1,
                    changeType: generic_diff_1.DiffType.Modified
                }
            }
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two objects with different properties result in an Modified result', function () {
        // 1. Arrange
        var oldValue = {
            first: "string",
            second: 100
        };
        var newValue = {
            second: 200,
            third: true
        };
        var expected = {
            oldValue: {
                first: "string",
                second: 100
            },
            newValue: {
                second: 200,
                third: true
            },
            changeType: generic_diff_1.DiffType.Modified,
            first: {
                oldValue: "string",
                newValue: undefined,
                changeType: generic_diff_1.DiffType.Removed
            },
            second: {
                oldValue: 100,
                newValue: 200,
                changeType: generic_diff_1.DiffType.Modified
            },
            third: {
                oldValue: undefined,
                newValue: true,
                changeType: generic_diff_1.DiffType.Added
            }
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that array / object comparison results in a TypeChanged result', function () {
        // 1. Arrange
        var oldValue = [1, 4, 9, 16];
        var newValue = { property: "value" };
        var expected = {
            oldValue: [1, 4, 9, 16],
            newValue: { property: "value" },
            changeType: generic_diff_1.DiffType.TypeChanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that object / array comparison results in a TypeChanged result', function () {
        // 1. Arrange
        var oldValue = { property: "value" };
        var newValue = [1, 4, 9, 16];
        var expected = {
            oldValue: { property: "value" },
            newValue: [1, 4, 9, 16],
            changeType: generic_diff_1.DiffType.TypeChanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays with same primitive values result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = [1, 4, 9, 16];
        var newValue = [1, 4, 9, 16];
        var expected = {
            oldValue: [1, 4, 9, 16],
            newValue: [1, 4, 9, 16],
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays, where the old has less elements will result in a Added result', function () {
        // 1. Arrange
        var oldValue = [1, 4, 9];
        var newValue = [1, 4, 9, 16];
        var expected = {
            oldValue: [1, 4, 9],
            newValue: [1, 4, 9, 16],
            addedItems: [16],
            removedItems: [],
            unchangedItems: [1, 4, 9],
            changedItems: [],
            changeType: generic_diff_1.DiffType.Added
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays, where the old has more elements will result in a Removed result', function () {
        // 1. Arrange
        var oldValue = [1, 4, 9, 16, 25];
        var newValue = [1, 4, 9, 16];
        var expected = {
            oldValue: [1, 4, 9, 16, 25],
            newValue: [1, 4, 9, 16],
            addedItems: [],
            removedItems: [25],
            unchangedItems: [1, 4, 9, 16],
            changedItems: [],
            changeType: generic_diff_1.DiffType.Removed
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays with same complex values result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        var newValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        var expected = {
            oldValue: [
                { index: 0, value: "first-value" },
                { index: 1, value: "second-value" },
            ],
            newValue: [
                { index: 0, value: "first-value" },
                { index: 1, value: "second-value" },
            ],
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays with same complex values (different property order) result in an unchanged result', function () {
        // 1. Arrange
        var oldValue = [
            { index: 0, value: "first-value" },
            { index: 1, value: "second-value" },
        ];
        var newValue = [
            { value: "first-value", index: 0 },
            { value: "second-value", index: 1 },
        ];
        var expected = {
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
            changeType: generic_diff_1.DiffType.Unchanged
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays with different primitive values result in an modified result', function () {
        // 1. Arrange
        var oldValue = [1, 4, 9, 16];
        var newValue = [1, 4, 16, 25];
        var expected = {
            oldValue: [1, 4, 9, 16],
            newValue: [1, 4, 16, 25],
            addedItems: [25],
            removedItems: [9],
            unchangedItems: [1, 4, 16],
            changedItems: [],
            changeType: generic_diff_1.DiffType.Added | generic_diff_1.DiffType.Removed
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two arrays with payload changes detects changes using key extractors', function () {
        // 1. Arrange
        var oldValue = [
            { key: 1, payload: "one" },
            { key: 2, payload: "two" },
            { key: 3, payload: "three" },
        ];
        var newValue = [
            { key: 0, payload: "zero" },
            { key: 1, payload: "one" },
            { key: 2, payload: "two" },
            { key: 3, payload: "four" },
        ];
        var keyExtractor = {
            items: function (item) { return item.key; }
        };
        var expected = {
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
                    changeType: generic_diff_1.DiffType.Modified,
                    payload: { oldValue: 'three', newValue: 'four', changeType: generic_diff_1.DiffType.Modified }
                }],
            unchangedItems: [
                { key: 1, payload: "one" },
                { key: 2, payload: "two" }
            ],
            changeType: generic_diff_1.DiffType.Modified | generic_diff_1.DiffType.Added
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getArrayDifference(oldValue, newValue, "items", keyExtractor);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it('verifies that two objects with array properties with payload changes detects changes using key extractors', function () {
        // 1. Arrange
        var oldValue = {
            items: [
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "three" },
            ]
        };
        var newValue = {
            items: [
                { key: 0, payload: "zero" },
                { key: 1, payload: "one" },
                { key: 2, payload: "two" },
                { key: 3, payload: "four" },
            ]
        };
        var keyExtractor = {
            items: function (item) { return item.key; }
        };
        var expected = {
            oldValue: {
                items: [{ key: 1, payload: 'one' }, { key: 2, payload: 'two' }, { key: 3, payload: 'three' }]
            },
            newValue: {
                items: [{ key: 0, payload: 'zero' }, { key: 1, payload: 'one' }, { key: 2, payload: 'two' }, { key: 3, payload: 'four' }]
            },
            changeType: generic_diff_1.DiffType.Modified,
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
                        changeType: generic_diff_1.DiffType.Modified,
                        payload: { oldValue: 'three', newValue: 'four', changeType: generic_diff_1.DiffType.Modified }
                    }],
                unchangedItems: [
                    { key: 1, payload: "one" },
                    { key: 2, payload: "two" }
                ],
                changeType: generic_diff_1.DiffType.Modified | generic_diff_1.DiffType.Added
            }
        };
        // 2. Act
        var actual = generic_diff_1.GenericDiff.getDifference(oldValue, newValue, "", keyExtractor);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
});
