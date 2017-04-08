module.exports = function(config){
  config.set({
    files: [
        '*.js'
    ],
    mutate: ['groupby.js','generic-diff.js'],
    testFramework: 'jasmine',
    testRunner: 'karma',
    reporter: ['progress', 'clear-text', 'dots', 'html', 'event-recorder'],
    coverageAnalysis: 'perTest',
    plugins: ['stryker-karma-runner', 'stryker-jasmine', 'stryker-html-reporter'],
    logLevel: 'debug'
  });
}