var join = require('path').join;

module.exports =  {
  appsPath: join(__dirname, 'apps'),
  apps: {
    'angular': {
      'lib': ''
    },
    'core': {
      'auth': '',
      'defaultRenderArgs': '',
      'page': '',
      'stylus': ''
    },
    'home': {
      'base': ''
    },
    'api': {
      'activity': '',
      'rest': '',
      'customer': '',
      'project': '',
      'service': '',
      'setting': '',
      'tag': '',
      'timeslice': '',
      'user': ''
    },
    'db': {
      'orm': ''
    }
  },
  packages: [
    'gleeman-config',
    'gleeman-express',
    'gleeman-express-http',
    'gleeman-express-css',
    'gleeman-express-js',
    'gleeman-commander',
    'gleeman-express-renderargs'
  ]
};

