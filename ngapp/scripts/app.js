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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'HomeCtrl'
      })
      .when('/me', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/my/todos/:status', {
        controller: 'TodoCtrl',
        templateUrl: '/views/todos.html'
      })
      .when('/my/todos', {
        controller: 'TodoCtrl',
        templateUrl: '/views/todos.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/debug', {
        controller: 'ChangeCtrl',
        templateUrl: '/views/changes.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
