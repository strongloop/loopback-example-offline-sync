// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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
