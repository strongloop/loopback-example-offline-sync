var loopback = require('loopback');

var Todo = module.exports = loopback.DataModel.extend('Todo', {
  title: String,
  done: {type: Boolean, default: false}
});

Todo.stats = function(filter, cb) {
  var stats = {};

  async.parallel([
    countComplete,
    count
  ], function() {
    if(err) return cb(err);
    stats.remaining = stats.total - stats.completed;
    cb(null, stats);
  });

  function countComplete() {
    Todo.count({where: {completed: true}}, function(err, count) {
      stats.completed = count;
      cb(err);
    });
  }

  function count() {
    Todo.count(function(err, count) {
      stats.total = count;
      cb(err);
    });
  }
}
