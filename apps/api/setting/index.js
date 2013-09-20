var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:setting:setting',

    function(done, add, Setting) {
      add('setting', Setting);
      done();
    },
    'api:rest:server'
  ]
});
