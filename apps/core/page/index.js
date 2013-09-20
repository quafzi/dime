var express = require('express');
var _       = require('lodash');

var server = function(done, config, rootServer, getStyles, getScripts) {
  var app = express();
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.get('*', function(req, res) {
    var scripts = _.filter(getScripts(), function(script) {
      return script.combine !== config.script.combine || script.type === 'link';
    });
    var styles = _.filter(getStyles(), function(style) {
      return style.combine !== config.style.combine || style.type === 'link';
    });
  });
  rootServer.use(app);
  done(null, app);
};

module.exports = {
  server: [
    'gleeman:config:base',
    'gleeman:express:server',
    'gleeman:css:sorted',
    'gleeman:js:sorted',
    // some more preconditions
    'gleeman:js:server',
    'gleeman:css:server',
    server,
    'gleeman:http:start'
  ],
  scripts: ['gleeman:js:file', function(done, add) {
    add(__dirname + '/public/*.js', 100);
    done();
  }, 'core:page:server'],
  style: ['core:stylus:add', function(done, add) {
    add(__dirname, 'style/*.styl');
    done();
  }, 'core:page:server'],
  xhrMiddleware: ['gleeman:express:server', function(done, expressServer) {
    expressServer.use(function(req, res, next) {
      req.isXhr = req.accepted[0].value === 'application/json';
      next();
    });
    done();
  }, 'core:page:server'],
  scriptComplete: [
    'core:defaultRenderArgs:add',
    'gleeman:js:sorted',
    'gleeman:config:base',
    'gleeman:js:server',
    'gleeman:js:combine',
    function(done, addRenderArg, getScripts, config) {
      var scripts = _.filter(getScripts(), function(script) {
        return script.type === 'link'
            || !config.script.combine
            || !script.combine;
      });
      addRenderArg('scripts', scripts);
      done();
    },
    'core:defaultRenderArgs:get'
  ],
  styleComplete: [
    'core:defaultRenderArgs:add',
    'gleeman:css:sorted',
    'gleeman:config:base',
    'gleeman:css:server',
    'gleeman:css:combine',
    function(done, addRenderArg, getStyles, config) {
      addRenderArg('styles', _.filter(getStyles(), function(style) {
        return style.combine !== config.style.combine || style.type === 'link';
      }));
      done();
    },
    'core:defaultRenderArgs:get'
  ],
  configRenderArgs: [
    'core:defaultRenderArgs:add',
    'gleeman:config:base',
    function(done, addRenderArg, config) {
      addRenderArg('config', config);
      addRenderArg('title', 'Fastfish');
      addRenderArg('year', new Date().getYear() + 1900);
      addRenderArg('metaDate', new Date(new Date() - 2*60*60*1000).toISOString());
      done();
    },
    'core:defaultRenderArgs:get',
  ],
  reqRenderArgs: [
    'core:defaultRenderArgs:add',
    'gleeman:express:server',
    function(done, addRenderArg, server) {
      server.use(function(req, res, next) {
        var name = req.host.split('.');
        name = name.length === 3 ? name[1] : name[0];
        addRenderArg('lastname', name, req);
        addRenderArg('host', req.host, req);
        next();
      });
      done();
    },
    'core:defaultRenderArgs:get',
  ]
};
