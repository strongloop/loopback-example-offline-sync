'use strict';

var explorer = require('loopback-explorer');

module.exports = function(server) {
  var restApiRoot = server.get('restApiRoot');

  var explorerApp = explorer(server, { basePath: restApiRoot });
  server.use('/explorer', explorerApp);
  server.once('started', function() {
    var baseUrl = server.get('url').replace(/\/$/, '');
    console.log('Browse your REST API at %s%s', baseUrl, explorerApp.mountpath);
  });
};
