var _  = require('lodash');

module.exports = {
  db: [
    'gleeman:require:sequelize',
    'gleeman:config:base',
      function(dbDone, Sequelize, config) {
      var extra = config.db.extra;

      extra.define = extra.define || {};

      extra.define.instanceMethods = {
        pub: function() {
          return this;
        }
      };

      extra.define.timestamps = true;

      var db = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        extra
      );
      db.lib = Sequelize;
      dbDone(null, db);
    }
  ],
}
