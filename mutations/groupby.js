if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (keySelector) {
        var result = [];
        var array = this;
        this.forEach(function (item, index) {
            var key = keySelector(item, index);
            var keyItem = result.find(function (r) { return r.key === key; });
            if (!keyItem) {
                result.push({
                    key: key,
                    items: [item]
                });
            }
            else {
                keyItem.items.push(item);
            }
        });
        return result;
    };
}
if (!Array.prototype.groupReduce) {
    Array.prototype.groupReduce = function (keySelector, reducer, initial) {
        var result = [];
        var array = this;
        var initFunc;
        if (Array.isArray(initial)) {
            initFunc = function () { return initial.slice(); };
        }
        else if (typeof (initial) === "object" && initial != null) {
            initFunc = function () { return Object.assign({}, initial); };
        }
        else {
            initFunc = function () { return initial; };
        }
        this.forEach(function (item, index) {
            var key = keySelector(item, index);
            var keyItem = result.find(function (r) { return r.key === key; });
            if (!keyItem) {
                keyItem = {
                    key: key,
                    value: initFunc()
                };
                result.push(keyItem);
            }
            keyItem.value = reducer(keyItem.value, item);
            ;
        });
        return result;
    };
}
