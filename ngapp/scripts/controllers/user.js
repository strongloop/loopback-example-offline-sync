'use strict';

/**
 * @ngdoc function
 * @name loopbackExampleFullStackApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the loopbackExampleFullStackApp
 */
angular.module('loopbackExampleFullStackApp')
  .controller('UserCtrl', function ($scope) {
    $scope.foo = Math.random();
  });
