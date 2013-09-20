var _      = require('lodash');
var moment = require('moment');

// Customer Model
function Customer(done, db, User, Activities, Projects) {
  var schema = {
    name:    db.lib.STRING,
    alias:   db.lib.STRING,
    user_id: { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'customers',
  };
  var Customer = db.define('Customer', schema, config);

  Customer.belongsTo(User);

  Customer.hasMany(Activities);
  Customer.hasMany(Projects);

  done(null, Customer);
}

module.exports = {
  customer: [
    'db:orm:db',
    'api:user:user',
    'api:activity:activity',
    'api:project:project',
    Customer
  ],
};
