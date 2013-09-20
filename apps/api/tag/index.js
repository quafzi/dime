var _     = require('lodash');
var model = require('./model');

module.exports = _.extend(model, {
  restApi: [
    'api:rest:add',
    'api:tag:tag',

    function(done, add, Tag) {
      add('tag', Tag);
      done();
    },
    'api:rest:server'
  ]
});
