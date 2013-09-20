module.exports = {
  angularjs: ['gleeman:config:base', 'gleeman:css:file', 'gleeman:js:file', function(done, config, addCss, addJs) {
    addJs(__dirname + '/public/angular.js', 1000);
    addJs(__dirname + '/public/angular-locale_de-de.js', 900);
    addJs(__dirname + '/public/angular-webstorage.js', 900);
    done();
  }, 'core:page:scriptComplete']
};

