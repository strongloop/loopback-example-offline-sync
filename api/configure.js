exports.global = function(env, global) {
  global.api = {
    protocol: process.env.API_PROTOCOL || 'http',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    root: '/api'
  };
}

exports.local = function(env, global, local) {
  var db = local.db = {
    host: process.env.DB_HOST || global.api.host,
    port: process.env.DB_PORT || 27015
  };

  if(env === 'staging' || env === 'production') {
    db.user = process.env.DB_USER;
    db.password = process.env.DB_PASSWORD;
  }
}
