// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

/**
 * @ngdoc overview
 * @name loopbackExampleFullStackApp
 * @description
 * # loopbackExampleFullStackApp
 *
 * Main module of the application.
 */
angular
  .module('loopbackExampleFullStackApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
    Object.keys(window.CONFIG.routes)
      .forEach(function(route) {
        var routeDef = window.CONFIG.routes[route];
        $routeProvider.when(route, routeDef);
      });

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
