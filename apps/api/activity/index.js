var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:activity:activity',

    function(done, add, Activity) {
      add('activity', Activity);
      done();
    },
    'api:rest:server'
  ]
});
