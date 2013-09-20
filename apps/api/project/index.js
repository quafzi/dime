var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:project:project',

    function(done, add, Project) {
      add('project', Project);
      done();
    },
    'api:rest:server'
  ]
});

