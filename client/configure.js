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
};

exports.build = function(env, global, local, cb) {
  var b = browserify({basedir: __dirname});
  //b.require(require.resolve('./app.client.js'), { expose: 'client' });
  b.require('./' + pkg.main, { expose: 'client' });
  //b.add('./' + pkg.main);

  try {
    boot.compileToBrowserify({
      appRootDir: __dirname,
      modelsRootDir: path.resolve(__dirname, '..'),
      env: env
    }, b);
  } catch(err) {
    console.error(err.stack);
    return cb(err);
  }

  //var out = fs.createWriteStream(path.resolve(__dirname, pkg.browser));
  var out = fs.createWriteStream(path.resolve(__dirname, 'browser.bundle.js'));

  /*
  if(!isDev(env)) {
    b.transform({
      global: true
    }, 'uglifyify');
  }
  */

  var x = b.bundle({
    // TODO(bajtos) debug should be always true, the sourcemaps should be
    // saved to a standalone file when !isDev(env)
    debug: isDev(env)
  });
  x.on('error', cb);
  x.pipe(out);

  out.on('error', cb);
  out.on('close', cb);
};

function isDev(env) {
  return ~['debug', 'development', 'test'].indexOf(env);
}
