var LOCAL_CONFIG = require('local.config');

module.exports = {
  db: {
    url: LOCAL_CONFIG.serverInfo.url
  }
};
