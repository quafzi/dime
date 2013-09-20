var _      = require('lodash');
var moment = require('moment');

// Project Model
function Project(done, db, User, Activities) {
  var schema = {
    name:    db.lib.STRING,
    alias:   db.lib.STRING,
    rate:    db.lib.DECIMAL(10, 2),
    user_id: { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'projects',
  };
  var Project = db.define('Project', schema, config);

  Project.belongsTo(User);

  Project.hasMany(Activities);

  done(null, Project);
}

module.exports = {
  project: [
    'db:orm:db',
    'api:user:user',
    'api:activity:activity',
    Project
  ],
};
