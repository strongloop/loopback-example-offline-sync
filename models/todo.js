var loopback = require('loopback');

var Todo = module.exports = loopback.DataModel.extend('Todo', {
  title: String,
  done: {type: Boolean, default: false}
});
