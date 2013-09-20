module.exports = {
  cookie: [
    'gleeman:express:express', // express library
    'gleeman:express:server', // to mount app
    'gleeman:config:base',  // to fetch config variables

    function(done, express, rootServer, config) {
      rootServer.use(express.cookieParser());
      rootServer.use(express.cookieSession({
        key: config.security.cookiePath,
        secret: config.security.secret
      }));
      done();
    },

    'core:page:server'
  ]
}
