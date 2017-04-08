describe("Array Group By", function () {
    it("grouping an empty array should return empty result", function () {
        // 1. Arrange
        var source = [];
        var expected = [];
        // 2. Act
        var actual = source.groupBy(function (x) { return x; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("one item array should result in one group", function () {
        // 1. Arrange
        var source = [{ value: 10 }];
        var expected = [{
                key: 10,
                items: [{ value: 10 }]
            }];
        // 2. Act
        var actual = source.groupBy(function (x) { return x.value; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with different keys should result in two group", function () {
        // 1. Arrange
        var source = [{ value: 10 }, { value: 20 }];
        var expected = [{
                key: 10,
                items: [{ value: 10 }]
            }, {
                key: 20,
                items: [{ value: 20 }]
            }];
        // 2. Act
        var actual = source.groupBy(function (x) { return x.value; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with same keys should result in one group", function () {
        // 1. Arrange
        var source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        var expected = [{
                key: 1,
                items: [{ key: 1, value: 10 }, { key: 1, value: 20 }]
            }];
        // 2. Act
        var actual = source.groupBy(function (x) { return x.key; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("five items should properly be grouped in two groups", function () {
        // 1. Arrange
        var source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        var expected = [{
                key: 1,
                items: [{ key: 1, value: 10 }, { key: 1, value: 30 }, { key: 1, value: 50 }]
            }, {
                key: 2,
                items: [{ key: 2, value: 20 }, { key: 2, value: 40 }]
            }];
        // 2. Act
        var actual = source.groupBy(function (x) { return x.key; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("even and odd numbers should be properly separated", function () {
        // 1. Arrange
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var expected = [{
                key: "odd",
                items: [1, 3, 5, 7, 9]
            }, {
                key: "even",
                items: [2, 4, 6, 8, 10]
            }];
        // 2. Act
        var actual = source.groupBy(function (x) { return (x % 2) ? "odd" : "even"; });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("group-reducing an empty array should return empty result", function () {
        // 1. Arrange
        var source = [];
        var expected = [];
        var keySelector = function (x) { return x; };
        var reducer = function (a, b) { return a; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("one item array should result in one group with ignoring reducer", function () {
        // 1. Arrange
        var source = [{ value: 10 }];
        var expected = [{
                key: 10,
                value: 0
            }];
        var keySelector = function (x) { return x.value; };
        var reducer = function (a, b) { return a; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("one item array should result in one group with summing reducer", function () {
        // 1. Arrange
        var source = [{ value: 10 }];
        var expected = [{
                key: 10,
                value: 10
            }];
        var keySelector = function (x) { return x.value; };
        var reducer = function (a, b) { return a + b.value; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with different keys should result in two group with ignoring reducer", function () {
        // 1. Arrange
        var source = [{ value: 10 }, { value: 20 }];
        var expected = [{
                key: 10,
                value: 0
            }, {
                key: 20,
                value: 0
            }];
        var keySelector = function (x) { return x.value; };
        var reducer = function (a, b) { return a; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with different keys should result in two group with summing reducer", function () {
        // 1. Arrange
        var source = [{ value: 10 }, { value: 20 }];
        var expected = [{
                key: 10,
                value: 10
            }, {
                key: 20,
                value: 20
            }];
        var keySelector = function (x) { return x.value; };
        var reducer = function (a, b) { return a + b.value; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with same keys should result in one group with ignoring reducer", function () {
        // 1. Arrange
        var source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        var expected = [{
                key: 1,
                value: 0
            }];
        var keySelector = function (x) { return x.key; };
        var reducer = function (a, b) { return a; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("two items with same keys should result in one group with summing reducer", function () {
        // 1. Arrange
        var source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        var expected = [{
                key: 1,
                value: 30
            }];
        var keySelector = function (x) { return x.key; };
        var reducer = function (a, b) { return a + b.value; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("five items should properly be grouped in two groups with ignoring reducer", function () {
        // 1. Arrange
        var source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        var expected = [{
                key: 1,
                value: 0
            }, {
                key: 2,
                value: 0
            }];
        var keySelector = function (x) { return x.key; };
        var reducer = function (a, b) { return a; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("five items should properly be grouped in two groups with summing reducer", function () {
        // 1. Arrange
        var source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        var expected = [{
                key: 1,
                value: 90
            }, {
                key: 2,
                value: 60
            }];
        var keySelector = function (x) { return x.key; };
        var reducer = function (a, b) { return a + b.value; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("even and odd numbers should be properly separated and reduced (summing reducer)", function () {
        // 1. Arrange
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var expected = [{
                key: "odd",
                value: 25
            }, {
                key: "even",
                value: 30
            }];
        var keySelector = function (x) { return (x % 2) ? "odd" : "even"; };
        var reducer = function (a, b) { return a + b; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("even and odd numbers should be properly separated and reduced (multiplying reducer)", function () {
        // 1. Arrange
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var expected = [{
                key: "odd",
                value: 945
            }, {
                key: "even",
                value: 3840
            }];
        var keySelector = function (x) { return (x % 2) ? "odd" : "even"; };
        var reducer = function (a, b) { return a * b; };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, 1);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("even and odd numbers should be properly separated and reduced (object reducer)", function () {
        // 1. Arrange
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var expected = [{
                key: "odd",
                value: {
                    sum: 25,
                    product: 945
                }
            }, {
                key: "even",
                value: {
                    sum: 30,
                    product: 3840
                }
            }];
        var keySelector = function (x) { return (x % 2) ? "odd" : "even"; };
        var reducer = function (a, b) {
            return { sum: a.sum + b, product: a.product * b };
        };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, { sum: 0, product: 1 });
        // 3. Assert
        expect(actual).toEqual(expected);
    });
    it("even and odd numbers should be properly separated and reduced (array reducer)", function () {
        // 1. Arrange
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var expected = [{
                key: "odd",
                value: [25, 945]
            }, {
                key: "even",
                value: [30, 3840]
            }];
        var keySelector = function (x) { return (x % 2) ? "odd" : "even"; };
        var reducer = function (a, b) {
            return [a[0] + b, a[1] * b];
        };
        // 2. Act
        var actual = source.groupReduce(keySelector, reducer, [0, 1]);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
});
