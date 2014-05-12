module.exports = TodoCtrl;
var app = require('../app.html5');
var async = require('async');

function TodoCtrl($scope, $routeParams, $filter, Todo) {
	var todos = $scope.todos = [];

	$scope.newTodo = '';
	$scope.editedTodo = null;

  // sync the initial data
  sync();

	function onChange() {
    Todo.stats(function(err, stats) {
      if(err) return error(err);
      $scope.stats = stats;
    });
    Todo.find(function(err, todos) {
      $scope.todos = todos;
      $scope.$apply();
    });
  }

  onChange();

  function error(err) {
    //TODO error handling
    throw err;
  }

  function errorCallback(err) {
    if(err) error(err);
  }

  Todo.on('changed', onChange);
  Todo.on('deleted', onChange);

	// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', function () {
		var status = $scope.status = $routeParams.status || '';

		$scope.statusFilter = (status === 'active') ?
			{ completed: false } : (status === 'completed') ?
			{ completed: true } : null;
	});

	$scope.addTodo = function () {
		var todo = new Todo({title: $scope.newTodo});
    todo.save(onChange);
    $scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
	};

  $scope.todoCompleted = function(todo) {
    todo.completed = true;
    Todo.upsert(todo, function() {
      onChange();
    });
  }

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
    Todo.destroyAll({where: {completed: true}}, errorCallback);
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
    window.sync();
  }

  $scope.connected = function() {
    return window.connected();
  }

  $scope.connect = function() {
    window.isConnected = true;
    sync();
  }

  $scope.disconnect = function() {
    window.isConnected = false;
  }
}
