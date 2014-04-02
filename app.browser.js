// dependencies
var loopback = require('loopback');
var client = exports.client = loopback();
require('./bower_components/angular/angular.js');
require('./bower_components/angular-route/angular-route.js');

// data source
var remote = loopback.createDataSource({
  connector: loopback.Remote,
  root: 'http://localhost:3000/api'
});

// models
var User = require('./models/user');
var Todo = require('./models/todo');

// setup the model data sources
User.attachTo(remote);
Todo.attachTo(remote);

// routes
var routes = require('./routes.browser.js');

// angular dependencies
var dependencies = ['ngRoute'];

// angular app
var app = module.exports = angular.module('app', dependencies);

// setup controllers
// must require controllers in order for browserify
// to include them...
require('./controllers/app.ctrl');
require('./controllers/home.ctrl');
require('./controllers/todo.ctrl');
require('./controllers/user.ctrl');

Object.keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    var controllerModule = routeDef.controller
      .replace('Ctrl', '.ctrl')
      .toLowerCase();
    var Controller = require('./controllers/' + controllerModule);
    app.controller(name, Controller);
  });

// config
app
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    // setup routes
    Object.keys(routes)
      .forEach(function(route) {
        var routeDef = routes[route];
        $routeProvider.when(route, routeDef);
      });
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
