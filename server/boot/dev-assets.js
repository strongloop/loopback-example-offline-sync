// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

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
