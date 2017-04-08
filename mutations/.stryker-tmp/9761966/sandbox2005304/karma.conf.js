module.exports = function (config) {

  var _config = {
    frameworks: ["jasmine"],
    files: [
      { pattern: "./*.js" },
    ],
    karmaTypescriptConfig: {
      coverageOptions: {
        exclude: /(\.d|\-spec)\.ts/
      }
    },
    mochaReporter: {
      ignoreSkipped: true
    },
    reporters: ["mocha"],
    browsers: ["PhantomJS"]
  };

  config.set(_config);
};
