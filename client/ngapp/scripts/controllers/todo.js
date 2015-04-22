'use strict';

/**
 * @ngdoc function
 * @name loopbackExampleFullStackApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the loopbackExampleFullStackApp
 */
angular.module('loopbackExampleFullStackApp')
  .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, Todo,
                                            $location, sync, network) {
  $scope.todos = [];

  $scope.newTodo = '';
  $scope.editedTodo = null;

  // sync the initial data
  sync(onChange);

  // the location service
  $scope.loc = $location;

  function onChange() {
    Todo.stats(function(err, stats) {
      if(err) return error(err);
      $scope.stats = stats;
    });
    Todo.find({
      where: $scope.statusFilter,
      sort: 'order DESC'
    }, function(err, todos) {
      $scope.todos = todos;
      $scope.$apply();
    });
  }

  function error(err) {
    //TODO error handling
    throw err;
  }

  function errorCallback(err) {
    if(err) error(err);
  }

  Todo.observe('after save', function(ctx, next) {
    next();
    onChange();
  });
  Todo.observe('after delete', function(ctx, next) {
    next();
    onChange();
  });

  // Monitor the current route for changes and adjust the filter accordingly.
  $scope.$on('$routeChangeSuccess', function () {
    var status = $scope.status = $routeParams.status || '';
    $scope.statusFilter = (status === 'active') ?
    { completed: false } : (status === 'completed') ?
    { completed: true } : {};
  });

  $scope.addTodo = function () {
    Todo.create({title: $scope.newTodo})
      .then(function() {
        $scope.newTodo = '';
        $scope.$apply();
      });
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
  };

  $scope.todoCompleted = function(todo) {
    todo.completed = true;
    todo.save();
  };

  $scope.doneEditing = function (todo) {
    $scope.editedTodo = null;
    todo.title = todo.title.trim();

    if (!todo.title) {
      $scope.removeTodo(todo);
    } else {
      todo.save();
    }
  };

  $scope.removeTodo = function (todo) {
    todo.remove(errorCallback);
  };

  $scope.clearCompletedTodos = function () {
    Todo.destroyAll({completed: true}, onChange);
  };

  $scope.markAll = function (completed) {
    Todo.find(function(err, todos) {
      if(err) return errorCallback(err);
      todos.forEach(function(todo) {
        todo.completed = completed;
        todo.save(errorCallback);
      });
    });
  };

  $scope.sync = function() {
    sync();
  };

  $scope.connected = function() {
    return network.isConnected;
  };

  $scope.connect = function() {
    network.isConnected = true;
    sync();
  };

  $scope.disconnect = function() {
    network.isConnected = false;
  };

  Todo.on('conflicts', function(conflicts) {
    $scope.localConflicts = conflicts;
    conflicts.forEach(function(conflict) {
      conflict.type(function(err, type) {
        conflict.type = type;
        conflict.models(function(err, source, target) {
          conflict.source = source;
          conflict.target = target;
          conflict.manual = new conflict.SourceModel(source || target);
          $scope.$apply();
        });
        conflict.changes(function(err, source, target) {
          conflict.sourceChange = source;
          conflict.targetChange = target;
          $scope.$apply();
        });
      });
    });
  });

  $scope.resolveUsingSource = function(conflict) {
    conflict.resolveUsingSource(refreshConflicts);
  };

  $scope.resolveUsingTarget = function(conflict) {
    conflict.resolveUsingTarget(refreshConflicts);
  };

  $scope.resolveManually = function(conflict) {
    conflict.resolveManually(conflict.manual, refreshConflicts);
  };

  function refreshConflicts() {
    $scope.localConflicts = [];
    $scope.$apply();
    sync();
  }
});
