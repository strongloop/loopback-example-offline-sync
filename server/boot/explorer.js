var explorer = require('loopback-explorer');

module.exports = function(app) {
  var restApp = require('../../rest');
  var restApiRoot = app.get('restApiRoot');

  var explorerApp = explorer(restApp, { basePath: restApiRoot });
  app.use('/explorer', explorerApp);
  app.once('started', function(baseUrl) {
    console.log('Browse your REST API at %s%s', baseUrl, explorerApp.mountpath);
  });
};
