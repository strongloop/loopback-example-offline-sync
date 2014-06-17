var path = require('path');
var GLOBAL_CONFIG = require('../global-config');

module.exports = {
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  staticCSS: path.join(__dirname, 'css')
};
