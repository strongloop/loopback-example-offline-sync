'use strict';

module.exports = function(server) {

  // TODO(ritch) this should be unecessary soon....
  var Todo = server.models.Todo;
  server.model(Todo.getChangeModel());
};
