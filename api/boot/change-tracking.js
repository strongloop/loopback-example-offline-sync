var server = require('../app.api');

// TODO(ritch) this should be unecessary soon....
var Todo = server.models.Todo;
server.model(Todo.getChangeModel());
