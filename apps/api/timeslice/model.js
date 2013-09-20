var _      = require('lodash');
var moment = require('moment');

// Timeslice Model
function Timeslice(done, db, User) {
  var schema = {
    activity_id: { type: db.lib.INTEGER, validate: { notNull: true } },
    started_at:  db.lib.DATE,
    stopped_at:  db.lib.DATE,
    user_id:     { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'timeslices',
  };
  var Timeslice = db.define('Timeslice', schema, config);

  Timeslice.belongsTo(User);

  done(null, Timeslice);
}

module.exports = {
  timeslice: [
    'db:orm:db',
    'api:user:user',
    Timeslice
  ],
};
