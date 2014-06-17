var globalConfig = require('global.config');

module.exports = {
  db: {
    connector: 'mongodb',
    hostname: process.env.DB_HOST || globalConfig.api.host,
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'todo-example',
  }
};
