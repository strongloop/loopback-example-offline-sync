var GLOBAL_CONFIG = require('../global-config');

var isDevEnv = (process.env.NODE_ENV || 'development') === 'development';

module.exports = {
  hostname: GLOBAL_CONFIG.hostname,
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  livereload: process.env.LIVE_RELOAD,
  isDevEnv: isDevEnv,
  indexFile: require.resolve(isDevEnv ?
    '../client/ngapp/index.html' : '../client/dist/index.html'),
  port: GLOBAL_CONFIG.port,
  legacyExplorer: GLOBAL_CONFIG.legacyExplorer
};
