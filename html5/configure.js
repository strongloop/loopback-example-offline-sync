var gulp = require('gulp');
var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');
var browserify = require('browserify');

exports.global = function(env, global) {
  // routes
  global.routes = {
    '/': {
      controller: 'HomeCtrl',
      templateUrl: 'views/welcome'
    },
    '/me': {
      controller: 'UserCtrl',
      templateUrl: 'views/me',
    },
    '/my/todos': {
      controller: 'TodoCtrl',
      templateUrl: 'views/todos'
    }
  };

  global.html5Bundle = path.join(__dirname, 'build', 'bundle.js');
  global.bundleURL = '/bundle.js';
}

exports.local = function configure(env, global, local) {
  local.serverInfo = {
    root: global.api.protocol
        + '://'
        + global.api.host
        + ':'
        + global.api.port
        + global.api.root || '/api'
  };
}

exports.build = function(env, global, local) {
  var b = browserify();
  b.add(path.join(__dirname, pkg.main));
  b.bundle().pipe(fs.createWriteStream(global.html5Bundle));
}
