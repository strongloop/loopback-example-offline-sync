var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');
var browserify = require('browserify');
var boot = require('loopback-boot');

exports.global = function(env, global) {
};

exports.local = function configure(env, global, local) {
  // NOTE: this config will be available in the browser
  local.serverInfo = {
    api: global.api,
    url: global.api.protocol
        + '://'
        + global.api.host
        + ':'
        + global.api.port
        + global.api.root
  };
  local.routes = global.routes;
};

exports.build = function(env, global, local, cb) {
  var b = browserify({ basedir: __dirname });
  b.require('./' + pkg.main, { expose: 'lbclient' });

  try {
    boot.compileToBrowserify({
      appRootDir: __dirname,
      env: env
    }, b);
  } catch(err) {
    return cb(err);
  }

  var bundlePath = path.resolve(__dirname, 'browser.bundle.js');
  var out = fs.createWriteStream(path.resolve(__dirname, bundlePath));

  b.bundle({
    // TODO(bajtos) debug should be always true, the sourcemaps should be
    // saved to a standalone file when !isDev(env)
    debug: isDev(env)
  })
    .on('error', cb)
    .pipe(out);

  out.on('error', cb);
  out.on('close', cb);
};

function isDev(env) {
  return ~['debug', 'development', 'test'].indexOf(env);
}
