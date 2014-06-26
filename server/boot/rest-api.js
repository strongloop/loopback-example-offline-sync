module.exports = function(app) {
  var restApp = require('../../rest');
  var restApiRoot = app.get('restApiRoot');
  app.use(restApiRoot, restApp);
};
