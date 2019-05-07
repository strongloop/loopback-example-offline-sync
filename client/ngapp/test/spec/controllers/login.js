// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('loopbackExampleFullStackApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a `foo` property to the scope', function () {
    expect(scope.foo).toBeDefined();
  });
});
