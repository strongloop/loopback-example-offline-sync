'use strict';

/**
 * @ngdoc function
 * @name loopbackExampleFullStackApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loopbackExampleFullStackApp
 */
angular.module('loopbackExampleFullStackApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
