module.exports = ChangeCtrl;

function ChangeCtrl($scope, $routeParams, $filter, Todo) {
	Todo.changes(function(err, changes) {
		$scope.changes = changes;
		$scope.$apply();

		RemoteTodo.diff(0, changes, function(err, diff) {
			$scope.diff = diff;
			$scope.$apply();
		});
	});

	$scope.clearLocalStorage = function() {
		localStorage.removeItem('todo-db');
	}

	Todo.find(function(err, todos) {
		$scope.todos = todos;
		$scope.$apply();
	});
}