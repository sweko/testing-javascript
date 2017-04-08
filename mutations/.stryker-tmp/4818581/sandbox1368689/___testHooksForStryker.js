
    (function (window) {
      
          var id = 0, coverageStateAtStart;
          window.__coverage__ = globalCoverage = {};
          
        jasmine.getEnv().addReporter({
          specStarted: function () {
            
if (!coverageStateAtStart && window.__strykerCoverageCurrentTest__) {
  coverageStateAtStart = clone(window.__strykerCoverageCurrentTest__);
}
          }
        });
          
        jasmine.getEnv().addReporter({
          specDone: function () {
            
       globalCoverage[id] = coverageResult = {};
      id++;
           var coveragePerTest = window.__strykerCoverageCurrentTest__;
           if(window.__strykerCoverageCurrentTest__) {
              Object.keys(coveragePerTest).forEach(function (file) {
                  var coverage = coveragePerTest[file];
                  coverageResult[file] = { s: coverage.s };
                  coverage.s = clone(coverageStateAtStart[file].s);
              });
           }
          }
        });
              
    function clone(source) {
        var result = source;
        if (Array.isArray(source)) {
            result = [];
            source.forEach(function (child, index) {
                result[index] = clone(child);
            });
        } else if (typeof source == "object") {
            // it is an object literal
            result = {};
            for (var i in source) {
                result[i] = clone(source[i]);
            }
        }
        return result;
    };
      
    })((Function('return this'))());