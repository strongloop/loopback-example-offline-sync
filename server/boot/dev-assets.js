var path = require('path');

module.exports = function(app) {
  if (!app.get('isDevEnv')) return;

  var serveDir = app.loopback.static;

  app.use(serveDir(projectPath('.tmp')));
  app.use('/bower_components', serveDir(projectPath('bower_components')));
  app.use('/lbclient', serveDir(projectPath('client/lbclient')));
};

function projectPath(relative) {
  return path.resolve(__dirname, '../..', relative);
}
