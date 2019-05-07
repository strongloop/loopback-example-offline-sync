// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {

  // TODO(ritch) this should be unecessary soon....
  var Todo = server.models.Todo;
  server.model(Todo.getChangeModel());
};
