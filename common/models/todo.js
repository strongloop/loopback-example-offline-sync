'use strict';

var async = require('async');

module.exports = function(Todo) {
  Todo.definition.properties.created.default = Date.now;

  Todo.stats = function(filter, cb) {
    var stats = {};
    cb = arguments[arguments.length - 1];
    var Todo = this;

    async.parallel([
      countComplete,
      count
    ], function(err) {
      if (err) return cb(err);
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
  };

  Todo.handleChangeError = function(err) {
    console.warn('Cannot update change records for Todo:', err);
  };

  Todo.remoteMethod('stats', {
    accepts: {arg: 'filter', type: 'object'},
    returns: {arg: 'stats', type: 'object'},
    http: { path: '/stats' }
  }, Todo.stats);
};
