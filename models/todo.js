var loopback = require('loopback');
var async = require('async');

var Todo = module.exports = loopback.DataModel.extend('Todo', {
  id: {id: true, type: String},
  title: String,
  completed: {type: Boolean, default: false},
  created: {type: Number, default: Date.now}
}, {
  trackChanges: true
});

Todo.beforeSave = function(next, model) {
  if(!model.id) model.id = 't-' + Math.floor(Math.random() * 10000).toString();
  next();
}

Todo.stats = function(filter, cb) {
  var stats = {};
  cb = arguments[arguments.length - 1];
  var Todo = this;
  
  async.parallel([
    countComplete,
    count
  ], function(err) {
    if(err) return cb(err);
    stats.remaining = stats.total - stats.completed;
    cb(null, stats);
  });

  function countComplete(cb) {
    Todo.count({completed: true}, function(err, count) {
      stats.completed = count;
      cb(err);
    });
  }

  function count(cb) {
    Todo.count(function(err, count) {
      stats.total = count;
      cb(err);
    });
  }
}

loopback.remoteMethod(Todo.stats, {
  accepts: {arg: 'filter', type: 'object'},
  returns: {arg: 'stats', type: 'object'}
});
