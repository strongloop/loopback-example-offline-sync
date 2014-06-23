'use strict';

/**
 * @ngdoc function
 * @name loopbackExampleFullStackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loopbackExampleFullStackApp
 */
angular.module('loopbackExampleFullStackApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
