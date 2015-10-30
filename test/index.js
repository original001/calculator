// require all modules ending in "Test" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /Test$/);
testsContext.keys().forEach(testsContext);
module.exports = testsContext;