var _      = require('lodash');
var moment = require('moment');

// Activity Model
function Activity(done, db, User, Timeslices) {
  var schema = {
    description: db.lib.STRING,
    rate:        db.lib.DECIMAL(10, 2),
    user_id:     { type: db.lib.INTEGER, validate: { notNull: true } },
    customer_id: db.lib.INTEGER,
    project_id:  db.lib.INTEGER,
    service_id:  db.lib.INTEGER
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'activities',
    instanceMethods: {
      getTotalDuration: function () {
        // @TODO iterate over timeslices and sum up duration
      },
      getTotalIncome: function () {
        return this.getTotalDuration() * this.rate
      },
      pub: function() {
        return _.omit(this, privateFields);
      }
    }
  };
  var Activity = db.define('Activity', schema, config);

  Activity.belongsTo(User);

  Activity.hasMany(Timeslices);

  done(null, Activity);
}

module.exports = {
  activity: [
    'db:orm:db',
    'api:user:user',
    'api:timeslice:timeslice',
    Activity
  ],
};
