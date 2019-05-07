// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(app) {
  var livereload = app.get('livereload');
  if (!livereload) return;

  app.middleware('routes:before', require('connect-livereload')({
    port: livereload
  }));
};
