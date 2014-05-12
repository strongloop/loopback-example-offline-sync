// dependencies
var LOCAL_CONFIG = require('local.config');
var loopback = require('loopback');
var client = exports.client = loopback();

// angular.js dependencies
require('./bower_components/angular/angular.js');
require('./bower_components/angular-route/angular-route.js');

// data sources
var remote = loopback.createDataSource({
  connector: loopback.Remote,
  url: LOCAL_CONFIG.serverInfo.url
});
var memory = loopback.createDataSource({
  connector: loopback.Memory,
  localStorage: 'todo-db'
});

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
function sync() {
  if(connected()) {
    console.log('syncing...');
    LocalTodo.replicate(RemoteTodo);
    RemoteTodo.replicate(LocalTodo);
  }
}

window.sync = sync;

// sync the initial data
sync();

// sync local changes if connected
LocalTodo.getChangeModel().on('changed', sync);

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
