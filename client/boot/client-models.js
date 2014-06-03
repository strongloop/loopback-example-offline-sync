var loopback = require('loopback');

// TODO(bajtos) This is a temporary workaround until we have
// strongloop/loopback-example-full-stack#13

module.exports = function(app) {
  var clientModels = require('../client.models.json');
  for (var name in clientModels) {
    app.model(name, clientModels[name]);
  }
};
