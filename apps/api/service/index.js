var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:service:service',

    function(done, add, Service) {
      add('service', Service);
      done();
    },
    'api:rest:server'
  ]
});
