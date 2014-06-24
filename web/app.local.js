var GLOBAL_CONFIG = require('../global-config');

module.exports = {
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  livereload: process.env.LIVE_RELOAD,
};
