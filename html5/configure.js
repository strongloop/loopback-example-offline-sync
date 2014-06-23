var async = require('async');
var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');
var browserify = require('browserify');
var buildClientBundle = require('../lbclient/build');

var buildDir = path.resolve(__dirname, 'build');

exports.global = function(env, global) {
  global.bundle = 'bundle.' + pkg.version;
  if(!isDev(env)) global.bundle += '.min';
  global.bundle += '.js';
  global.html5Views = path.join(__dirname, 'views');
  global.html5Bundle = path.join(buildDir, global.bundle);
  global.clientBundle = path.join(buildDir, 'client.' + global.bundle);
  global.bundleURL = '/' + global.bundle;
  global.clientURL = '/client.' + global.bundle;
}

exports.build = function(env, global, local, cb) {
  async.parallel([
    function(next) {
      createBundle(env, global, next);
    },
    function(next) {
      buildClientBundle(env, next);
    },
    function(next) {
      copyClientBundle(global, next);
    }
  ], cb);
};

function createBundle(env, global, cb) {
  var b = browserify({basedir: __dirname});
  b.add('./' + pkg.main);
  b.exclude('lbclient');

  var bundleDir = path.dirname(global.html5Bundle);
  if (!fs.existsSync(bundleDir))
    fs.mkdirSync(bundleDir);

  var out = fs.createWriteStream(global.html5Bundle);

  if (!isDev(env)) {
    b.transform({
      global: true
    }, 'uglifyify');
  }

  b.bundle({
    // TODO(bajtos) debug should be always true, the sourcemaps should be
    // saved to a standalone file when !isDev(env)
    debug: isDev(env)
  })
    .on('error', cb)
    .pipe(out);

  out.on('error', cb);
  out.on('close', cb);
}

function copyClientBundle(global, cb) {
  var clientBundle = require.resolve('../lbclient/browser.bundle.js');
  var client = fs.createReadStream(clientBundle);

  var out = fs.createWriteStream(global.clientBundle);

  client
    .on('error', cb)
    .pipe(out)
    .on('error', cb)
    .on('close', cb);
}

function isDev(env) {
  return ~['debug', 'development', 'test'].indexOf(env);
}
