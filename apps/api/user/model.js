var _      = require('lodash');

// User Model
function User(done, db) {
  var schema = {
    username:  db.lib.STRING,
    email:     db.lib.STRING,
    salt:      db.lib.STRING,
    password:  db.lib.STRING,
    firstname: db.lib.STRING,
    lastname:  db.lib.STRING
  };
  var privateFields = ['password', 'salt'];
  var config = {
    underscored: true,
    tableName: 'users',
    instanceMethods: {
      fullName: function () {
        return this.firstname + ' ' + this.lastname;
      },
      pub: function() {
        return _.omit(this, privateFields);
      },
      isAllowed: function(key) {
        // TODO check permissions!
        return true;
      }
    }
  };
  var User = db.define('User', schema, config);

  done(null, User);
}

module.exports = {
  user: [
    'db:orm:db',
    User
  ],
};
