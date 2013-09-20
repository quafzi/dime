var _ = require('lodash');

var models = {};

function addModel(name, Model, settings) {
  if(models[name]) {
    throw new Error('Model with name ' + name + ' already registered');
  }
  models[name] = {
    Resource: Model,
    settings: settings || {}
  };
}

function clearModels() {
  models = {};
}

function server(done, express, expressServer) {
  var app = express();
  _.each(models, function(model, name) {
    var settings = model.settings;
    var routePrefix = '/api' + (settings.routePrefix || '/' + name);
    // get one route
    app.get(routePrefix + '/:id', function(req, res, next) {
      model.Resource.find(req.params.id, settings).success(function(result) {
        return res.send(result.pub());
      }).error(next);
    });

    // get all route
    app.get(routePrefix, function(req, res, next) {
      var filter = _.extend({where: req.query}, settings);
      model.Resource.findAll(filter).success(function(instances) {
        var result = _.object(_.pluck(instances, 'id'), instances);
        return res.send(
          _.forEach(result, function(item) { item = item.pub() })
        );
        return res.send(function(item) { item = item.pub(); console.log(item) });
        return res.send(result);
      }).error(next);
    });

    // post one route
    app.post(routePrefix + '/:id', function(req, res, next) {
      model.Resource.find(req.params.id, settings).success(function(instance) {
        delete req.body.id;
        instance.updateAttributes(req.body).done(function(err, instance) {
          res.send(err ? 500 : instance);
        });
      }).error(next);
    });

    // put route
    app.put(routePrefix, function(req, res, next) {
      delete req.body.id;
      var instance = model.Resource.build(req.body);
      instance.validate().done(function(err) {
        if (err) {
          console.error(err)
          return res.send(422, err); // Unprocessable Entity (WebDAV; RFC 4918)
        }
        instance.beforeSave = instance.beforeSave || function(done) {
          done();
        };
        instance.beforeSave(function(err) {
          if (err) {
            console.error(err)
            return res.send(422, err); // Unprocessable Entity (WebDAV; RFC 4918)
          }
          instance.save().success(function(instance) {
            res.send(instance);
          }).error(function(err) {
            console.log(err);
            res.send(422, err); // Unprocessable Entity (WebDAV; RFC 4918)
          });
        });
      });
    });
    console.log('registered routes for ' + routePrefix);
  });
  expressServer.use(app);
  done(null, app);
}

module.exports = {
  add: function(done) {
    done(null, addModel);
  },
  clear: function(done) {
    done(null, clearModels);
  },
  server: [
    'gleeman:require:express', // express module
    'gleeman:express:server', // to mount app
    'core:auth:cookie', // to be sure that session is initialized

    server,

    'core:page:server' // to make sure, '*'-route applies at last
  ]
};
