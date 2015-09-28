module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            {pattern: 'www/assets/components/**/*.js', included: false },
            {pattern: 'www/assets/plugins/**/*.min.js', included: false },
            {pattern: 'test/dist/**/*.js', included: false },
            {pattern: 'test/entry.js', included: true },
        ],

        exclude: [
            //'www/assets/plugins/requirejs/'
        ],

        preprocessors: {
            '**/*.coffee': 'coffee'
        },

        coffeePreprocessor: {
            options: {
                bare: true,
                sourceMap: false
            }
        },

        osxReporter: {
            host: "localhost",
            port: 1337,
            notificationMode: 'failChange'
        },

        reporters: ['progress', 'osx'],

        port: 8000,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false

    })
};
