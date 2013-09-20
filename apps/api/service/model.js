var _      = require('lodash');
var moment = require('moment');

// Service Model
function Service(done, db, User, Activities) {
  var schema = {
    name:    db.lib.STRING,
    alias:   db.lib.STRING,
    rate:    db.lib.DECIMAL(10, 2),
    user_id: { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'services',
  };
  var Service = db.define('Service', schema, config);

  Service.belongsTo(User);

  Service.hasMany(Activities);

  done(null, Service);
}

module.exports = {
  service: [
    'db:orm:db',
    'api:user:user',
    'api:activity:activity',
    Service
  ],
};
