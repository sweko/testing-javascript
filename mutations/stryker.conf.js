module.exports = function(config){
  config.set({
    files: ['groupby.js', 'groupby-spec.js', 'generic-diff.js', 'generic-diff-spec.js', 'node_modules/babel-polyfill/dist/polyfill.js'],
    mutate: ['groupby.js', 'generic-diff.js'],
    testFramework: 'jasmine',
    testRunner: 'karma',
    reporter: ['progress', 'clear-text', 'dots', 'html', 'event-recorder'],
    coverageAnalysis: 'perTest',
    plugins: ['stryker-karma-runner', 'stryker-jasmine', 'stryker-html-reporter'],
  });
}