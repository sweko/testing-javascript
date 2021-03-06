describe("Array Group By", () => {

    it("grouping an empty array should return empty result", () => {
        // 1. Arrange
        const source = [];
        const expected = [];
        // 2. Act
        const actual = source.groupBy(x => x);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("one item array should result in one group", () => {
        // 1. Arrange
        const source = [{ value: 10 }];
        const expected = [{
            key: 10,
            items: [{ value: 10 }]
        }];
        // 2. Act
        const actual = source.groupBy(x => x.value);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("two items with different keys should result in two group", () => {
        // 1. Arrange
        const source = [{ value: 10 }, { value: 20 }];
        const expected = [{
            key: 10,
            items: [{ value: 10 }]
        }, {
            key: 20,
            items: [{ value: 20 }]
        }];
        // 2. Act
        const actual = source.groupBy(x => x.value);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("two items with same keys should result in one group", () => {
        // 1. Arrange
        const source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        const expected = [{
            key: 1,
            items: [{ key: 1, value: 10 }, { key: 1, value: 20 }]
        }];
        // 2. Act
        const actual = source.groupBy(x => x.key);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("five items should properly be grouped in two groups", () => {
        // 1. Arrange
        const source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        const expected = [{
            key: 1,
            items: [{ key: 1, value: 10 }, { key: 1, value: 30 }, { key: 1, value: 50 }]
        }, {
            key: 2,
            items: [{ key: 2, value: 20 }, { key: 2, value: 40 }]
        }];
        // 2. Act
        const actual = source.groupBy(x => x.key);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("even and odd numbers should be properly separated", () => {
        // 1. Arrange
        const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [{
            key: "odd",
            items: [1, 3, 5, 7, 9]
        }, {
            key: "even",
            items: [2, 4, 6, 8, 10]
        }];
        const keySelector = x => (x % 2) ? "odd" : "even";
        // 2. Act
        const actual = source.groupBy(keySelector);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("group-reducing an empty array should return empty result", () => {
        // 1. Arrange
        const source = [];
        const expected = [];
        const keySelector = x => x;
        const reducer = (a, b) => a;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("one item array should result in one group with ignoring reducer", () => {
        // 1. Arrange
        const source = [{ value: 10 }];
        const expected = [{
            key: 10,
            value: 0
        }];
        const keySelector = x => x.value;
        const reducer = (a, b) => a;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("one item array should result in one group with summing reducer", () => {
        // 1. Arrange
        const source = [{ value: 10 }];
        const expected = [{
            key: 10,
            value: 10
        }];
        const keySelector = x => x.value;
        const reducer = (a, b) => a + b.value;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("two items with different keys should result in two group with ignoring reducer", () => {
        // 1. Arrange
        const source = [{ value: 10 }, { value: 20 }];
        const expected = [{
            key: 10,
            value: 0
        }, {
            key: 20,
            value: 0
        }];
        const keySelector = x => x.value;
        const reducer = (a, b) => a;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("two items with different keys should result in two group with summing reducer", () => {
        // 1. Arrange
        const source = [{ value: 10 }, { value: 20 }];
        const expected = [{
            key: 10,
            value: 10
        }, {
            key: 20,
            value: 20
        }];
        const keySelector = x => x.value;
        const reducer = (a, b) => a + b.value;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("two items with same keys should result in one group with ignoring reducer", () => {
        // 1. Arrange
        const source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        const expected = [{
            key: 1,
            value: 0
        }];
        const keySelector = x => x.key;
        const reducer = (a, b) => a;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });


    it("two items with same keys should result in one group with summing reducer", () => {
        // 1. Arrange
        const source = [{ key: 1, value: 10 }, { key: 1, value: 20 }];
        const expected = [{
            key: 1,
            value: 30
        }];
        const keySelector = x => x.key;
        const reducer = (a, b) => a + b.value;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("five items should properly be grouped in two groups with ignoring reducer", () => {
        // 1. Arrange
        const source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        const expected = [{
            key: 1,
            value: 0
        }, {
            key: 2,
            value: 0
        }];
        const keySelector = x => x.key;
        const reducer = (a, b) => a;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("five items should properly be grouped in two groups with summing reducer", () => {
        // 1. Arrange
        const source = [
            { key: 1, value: 10 },
            { key: 2, value: 20 },
            { key: 1, value: 30 },
            { key: 2, value: 40 },
            { key: 1, value: 50 }
        ];
        const expected = [{
            key: 1,
            value: 90
        }, {
            key: 2,
            value: 60
        }];
        const keySelector = x => x.key;
        const reducer = (a, b) => a + b.value;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("even and odd numbers should be properly separated and reduced (summing reducer)", () => {
        // 1. Arrange
        const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [{
            key: "odd",
            value: 25
        }, {
            key: "even",
            value: 30
        }];
        const keySelector = x => (x % 2) ? "odd" : "even";
        const reducer = (a, b) => a + b;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 0);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("even and odd numbers should be properly separated and reduced (multiplying reducer)", () => {
        // 1. Arrange
        const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [{
            key: "odd",
            value: 945
        }, {
            key: "even",
            value: 3840
        }];
        const keySelector = x => (x % 2) ? "odd" : "even";
        const reducer = (a, b) => a * b;
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, 1);
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("even and odd numbers should be properly separated and reduced (object reducer)", () => {
        // 1. Arrange
        const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [{
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
        const keySelector = x => (x % 2) ? "odd" : "even";
        const reducer = (a, b) => {
            return { sum: a.sum + b, product: a.product * b };
        };
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, { sum: 0, product: 1 });
        // 3. Assert
        expect(actual).toEqual(expected);
    });

    it("even and odd numbers should be properly separated and reduced (array reducer)", () => {
        // 1. Arrange
        const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = [{
            key: "odd",
            value: [25, 945]
        }, {
            key: "even",
            value: [30, 3840]
        }];
        const keySelector = x => (x % 2) ? "odd" : "even";
        const reducer = (a, b) => {
            return [a[0] + b, a[1] * b];
        };
        // 2. Act
        const actual = source.groupReduce(keySelector, reducer, [0, 1]);
        // 3. Assert
        expect(actual).toEqual(expected);
    });
});
