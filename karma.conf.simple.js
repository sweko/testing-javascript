module.exports = function (config) {

  var _config = {
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "./simple/*.ts" },
      'node_modules/babel-polyfill/dist/polyfill.js'
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
      coverageOptions: {
        exclude: /(\.d|\-spec)\.ts/
      }
    },
    mochaReporter: {
      ignoreSkipped: true
    },
    reporters: ["mocha", "karma-typescript"],
    browsers: ["PhantomJS"]
  };

  config.set(_config);
};
