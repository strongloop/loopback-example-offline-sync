module.exports = function(app) {
  var routes = require('../../ngapp/config/routes');
  Object
    .keys(routes)
    .forEach(function(route) {
      app.get(route, function(req, res) {
        res.sendfile(app.get('indexFile'));
      });
    });
};
