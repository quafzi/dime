#!/usr/bin/env node

require('./dev');

var run = require('gleeman')(require('./apps'));
run([
  'gleeman:commander:parse',
  function(err) {
    err && console.error(err);
  }
]);

