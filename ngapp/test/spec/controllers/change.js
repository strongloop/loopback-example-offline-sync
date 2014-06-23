'use strict';

describe('Controller: ChangeCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackExampleFullStackApp'));

  var ChangeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangeCtrl = $controller('ChangeCtrl', {
      $scope: scope
    });
  }));

  it('should attach `clearLocalStorage()` to the scope', function () {
    expect(typeof scope.clearLocalStorage).toBe('function');
  });
});
