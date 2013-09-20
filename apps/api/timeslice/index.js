var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:timeslice:timeslice',

    function(done, add, Timeslice) {
      add('timeslice', Timeslice);
      done();
    },
    'api:rest:server'
  ]
});
