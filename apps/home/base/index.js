var _     = require('lodash');
var async = require('async');

module.exports = {
  server: [
    'gleeman:config:base',
    'gleeman:express:express',
    'gleeman:express:server',
    'core:defaultRenderArgs:get',
    function(done, config, express, rootServer, renderArgs) {
      server = express();

      server.set('views', __dirname + '/views');
      server.set('view engine', 'jade');
      server.get('/', function(req, res) {
        var args = renderArgs(req);
        res.render('index', args);
      });
      rootServer.use(server);
      done(null, server);
  }, 'core:page:server']
}
