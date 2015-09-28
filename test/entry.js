var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/test\.js/i.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/dist',

    // example of using a couple path translations (paths), to allow us to refer to different library dependencies, without using relative paths
    paths: {
        'matrix': '../www/assets/components/matrix',
        'lodash': '../www/assets/plugins/lodash/lodash.min',
        'reflux': '../www/assets/plugins/reflux/dist/reflux.min',
        'jquery': '../www/assets/plugins/jquery/jquery-1.11.1.min',
        'modernizr': '../www/assets/plugins/modernizr/modernizr3.min'
    },

    // example of using a shim, to load non AMD libraries (such as underscore)
    shim: {
        //'lodash': {
        //    exports: '_'
        //},
        //'jquery': {
        //    exports: '$'
        //},
        'reflux': {
            exports: 'Reflux'
        }
    },

    // dynamically load all test files
    deps: tests,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});