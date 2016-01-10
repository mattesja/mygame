// require all tests dynamically
// 1) folder "test"
// 2) incl. sub-folders
// 3) JS files
var testContext = require.context('./test', true, /\.js$/);

testContext.keys().forEach(function(path) {
    testContext(path);
});