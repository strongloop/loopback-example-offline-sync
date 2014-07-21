'use strict';

/**
 * @ngdoc function
 * @name loopbackExampleFullStackApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the loopbackExampleFullStackApp
 */
angular.module('loopbackExampleFullStackApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.foo = Math.random();
  });
