var webpackConfig = require('./webpack-test.config.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: ['test/**/*Test.js'],

        preprocessors: {
            'test/**/*Test.js': ['webpack', 'sourcemap', 'coverage']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
        },

        reporters: ['progress', 'osx', 'coverage'],

        osxReporter: {
            host: "localhost",
            port: 1337,
            notificationMode: 'failChange'
        },

        coverageReporter: {
            type : 'html',
            dir : 'test/coverage/'
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        port: 8000,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false,

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-osx-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-sourcemap-loader',
            'karma-coverage'
        ]
    })
};
