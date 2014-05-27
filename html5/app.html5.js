// dependencies
var LOCAL_CONFIG = require('local.config');
var loopback = require('loopback');
var client = exports.client = loopback();

// angular.js dependencies
require('./bower_components/angular/angular.js');
require('./bower_components/angular-route/angular-route.js');

var lbapp = loopback();

var dataSourceConfig = require('./build/datasources.js');
Object.keys(dataSourceConfig).forEach(function(key) {
  lbapp.dataSource(key, dataSourceConfig[key]);
});

var remote = lbapp.datasources.remote;
var memory = lbapp.datasources.memory;

// models
var User = require('models/user');
var RemoteTodo = window.RemoteTodo = require('models/todo');
var LocalTodo = window.LocalTodo = RemoteTodo.extend('LocalTodo');

// routes
var routes = LOCAL_CONFIG.routes;

// angular dependencies
var dependencies = ['ngRoute'];

// angular app
var app = module.exports = angular.module('app', dependencies);

// providers
app.value('Todo', LocalTodo);
app.value('sync', sync);

// setup controllers
// must require controllers in order for browserify
// to include them...
require('./controllers/app.ctrl');
require('./controllers/home.ctrl');
require('./controllers/todo.ctrl');
require('./controllers/user.ctrl');
require('./controllers/login.ctrl');
require('./controllers/register.ctrl');
require('./controllers/change.ctrl');

// setup the model data sources
RemoteTodo.attachTo(remote);
LocalTodo.attachTo(memory);


window.isConnected = true;

window.connected = function connected() {
  console.log('isConnected?', window.isConnected);
  return window.isConnected;
}

// setup model replication
function sync(cb) {
  if(connected()) {
    RemoteTodo.replicate(LocalTodo, function() {
      LocalTodo.replicate(RemoteTodo, cb);
    });
  }
}

// sync local changes if connected
LocalTodo.on('changed', sync);
LocalTodo.on('deleted', sync);

// setup routes
Object.keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    var controllerModule = routeDef.controller
      .replace('Ctrl', '.ctrl')
      .toLowerCase();
    var Controller = require('./controllers/' + controllerModule);
    app.controller(Controller.name, Controller);
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

function noop(){};
