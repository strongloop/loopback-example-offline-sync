var loopback = require('loopback');

var LocalTodo = loopback.createModel(require('./local-todo.json'));
module.exports = LocalTodo;
