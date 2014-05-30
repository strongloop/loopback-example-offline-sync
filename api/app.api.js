// dependencies
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-explorer');
var CONFIG = require('global.config');
var boot = require('loopback-boot');

// server
var server = module.exports = loopback();

boot(server, {
  appRootDir: path.resolve(__dirname),
  modelsRootDir: path.resolve(__dirname, '..'),
  appConfig: {
    // No app config to load, we are processing it manually now
    // TODO(bajtos) modify Gulp to create app.* config files
  },
});

// root api path
var apiPath = CONFIG.api.root;

// middleware
server.use(loopback.logger('dev'));
server.use(apiPath, loopback.rest());
server.use('/explorer', explorer(server, {basePath: apiPath}));

