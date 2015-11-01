var testsContext = require.context(".", true, /Test$/);
testsContext.keys().forEach(testsContext);
module.exports = testsContext;
