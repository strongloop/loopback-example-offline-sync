var pkg = require('./package.json');

exports.build = function build(env, cb) {
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

  var x = b.bundle({
    // TODO(bajtos) debug should be always true, the sourcemaps should be
    // saved to a standalone file when !isDev(env)
    debug: true
  });
  x.on('error', cb);
  x.pipe(out);
  out.on('error', cb);
  out.on('close', cb);
}
