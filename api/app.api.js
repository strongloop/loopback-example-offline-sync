// dependencies
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-explorer');
var boot = require('loopback-boot');

// the loopback api server
var api = module.exports = loopback();

boot(api, {
  appRootDir: __dirname,
  modelsRootDir: path.resolve(__dirname, '..'),
});

// middleware
api.use(loopback.logger('dev'));
api.use(api.get('restApiRoot'), loopback.rest());
api.use(api.get('explorerRoot'), explorer(server));
