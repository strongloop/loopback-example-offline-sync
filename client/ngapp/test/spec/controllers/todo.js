'use strict';

describe('Controller: TodoCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackExampleFullStackApp'));

  var TodoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoCtrl = $controller('TodoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of Todos to the scope', function () {
    expect(scope.todos.length).toBe(0);
  });
});
