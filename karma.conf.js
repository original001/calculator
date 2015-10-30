var webpackConfig = require('./webpack-test.config.js');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: ['test/index.js'],

        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap']
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-osx-reporter',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader'
        ],

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
        },

        reporters: ['progress', 'osx'],

        osxReporter: {
            host: "localhost",
            port: 1337,
            notificationMode: 'failChange'
        },

        port: 8000,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false

    })
};
