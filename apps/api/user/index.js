var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:user:user',

    function(done, add, User) {
      add('user', User);
      done();
    },
    'api:rest:server'
  ]
});
