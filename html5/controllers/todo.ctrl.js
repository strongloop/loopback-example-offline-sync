module.exports = TodoCtrl;
var Todo = require('models/todo');
var async = require('async');

// TodoCtrl.$inject = [];

function TodoCtrl($scope, $routeParams, $filter) {
	var todos = $scope.todos = [];

	$scope.newTodo = '';
	$scope.editedTodo = null;

	function onChange() {
    Todo.stats(function(err, stats) {
      if(err) return error(err);
      $scope.stats = stats;
    });
  }

  function error() {
    //TODO error handling
  }

  function errorCallback(err) {
    if(err) error(err);
  }

  Todo.on('change', onChange);

	// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', function () {
		var status = $scope.status = $routeParams.status || '';

		$scope.statusFilter = (status === 'active') ?
			{ completed: false } : (status === 'completed') ?
			{ completed: true } : null;
	});

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo = new Todo({title: newTodo});
    newTodo.save(errorCallback);
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {
		// todos[todos.indexOf(todo)] = $scope.originalTodo;
		// $scope.doneEditing($scope.originalTodo);
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
}
