var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:customer:customer',

    function(done, add, Customer) {
      add('customer', Customer);
      done();
    },
    'api:rest:server'
  ]
});
