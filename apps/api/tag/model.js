var _      = require('lodash');
var moment = require('moment');

// Tag Model
function Tag(done, db, User, Activities, Customers, Projects, Services, Timeslices) {
  var schema = {
    name:    db.lib.STRING,
    user_id: { type: db.lib.INTEGER, validate: { notNull: true } }
  };
  var privateFields = ['user_id'];
  var config = {
    underscored: true,
    tableName: 'tags',
  };
  var Tag = db.define('Tag', schema, config);

  Tag.belongsTo(User);
  Tag.hasMany(Activities);
  Tag.hasMany(Customers);
  Tag.hasMany(Projects);
  Tag.hasMany(Services);
  Tag.hasMany(Timeslices);

  done(null, Tag);
}

module.exports = {
  tag: [
    'db:orm:db',
    'api:user:user',
    'api:activity:activity',
    'api:customer:customer',
    'api:project:project',
    'api:service:service',
    'api:timeslice:timeslice',
    Tag
  ],
};
