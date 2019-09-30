var tape = require('tape');
var d3 = require('../dist/d3-progress');

require('./pathEqual');

tape('d3.progress() has the expected defaults', function (test) {
  var b = d3.progress();
  test.ok(b != null);
  test.end();
});
