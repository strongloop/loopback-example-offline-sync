// dependencies
var LOCAL_CONFIG = require('local.config');
var loopback = require('loopback');
var client = exports.client = loopback();

// angular.js dependencies
require('./bower_components/angular/angular.js');
require('./bower_components/angular-route/angular-route.js');

var lbapp = loopback();

require('./build/datasources.js')(lbapp);
require('./build/models.js')(lbapp);

// TODO(bajtos) Move the bi-di replication to loopback core,
// add model settings to enable the replication.
// Example:
//  LocalTodo: { options: {
//    base: 'Todo',
//    replicate: {
//      target: 'Todo',
//      mode: 'push' | 'pull' | 'bidi'
//    }}}

var LocalTodo = lbapp.models.LocalTodo;
var RemoteTodo = lbapp.models.Todo;

// setup model replication
function sync(cb) {
  if(window.connected()) {
    RemoteTodo.replicate(LocalTodo, function() {
      LocalTodo.replicate(RemoteTodo, cb);
    });
  }
}

// sync local changes if connected
LocalTodo.on('changed', sync);
LocalTodo.on('deleted', sync);

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

window.isConnected = true;

window.connected = function connected() {
  console.log('isConnected?', window.isConnected);
  return window.isConnected;
}

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
