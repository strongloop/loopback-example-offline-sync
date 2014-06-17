exports.global = function(env, global) {
  global.api = {
    protocol: process.env.API_PROTOCOL || 'http',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    root: '/api'
  };
}
