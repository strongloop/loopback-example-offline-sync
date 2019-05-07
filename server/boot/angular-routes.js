// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(app) {
  var routes = require('../../client/ngapp/config/routes');
  Object
    .keys(routes)
    .forEach(function(route) {
      app.get(route, function(req, res) {
        res.sendFile(app.get('indexFile'));
      });
    });
};
