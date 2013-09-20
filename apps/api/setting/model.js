var _      = require('lodash');
var moment = require('moment');

// Setting Model
function Setting(done, db, User) {
  var schema = {
    name:      db.lib.STRING,
    namespace: db.lib.STRING,
    value:     db.lib.STRING,
    user_id: { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'settings',
  };
  var Setting = db.define('Setting', schema, config);

  Setting.belongsTo(User);

  done(null, Setting);
}

module.exports = {
  setting: [
    'db:orm:db',
    'api:user:user',
    Setting
  ],
};
