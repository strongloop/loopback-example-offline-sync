var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
var explorer = require('loopback-explorer');

var app = module.exports = loopback();

boot(app, __dirname);

// middleware
app.use(loopback.compress());

var livereload = app.get('livereload');
if (livereload) {
  app.use(require('connect-livereload')({
    port: livereload
  }));
}

// mount the REST API and the API explorer
var restApp = require('../rest');
var restApiRoot = app.get('restApiRoot');
app.use(restApiRoot, restApp);

var explorerApp = explorer(restApp, { basePath: restApiRoot });
app.use('/explorer', explorerApp);
app.once('started', function(baseUrl) {
  console.log('Browse your REST API at %s%s', baseUrl, explorerApp.mountpath);
});

// Mount static files like ngapp
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
var isDevEnv = app.get('env') === 'development';
var NGAPP_INDEX = require.resolve(isDevEnv ?
  '../ngapp/index.html' : '../ngapp/dist/index.html');

// html5 routes
var routes = require('../ngapp/config/routes');
Object
  .keys(routes)
  .forEach(function(route) {
    app.get(route, function(req, res) {
      res.sendfile(NGAPP_INDEX);
    });
  });

// ngapp files
app.use(loopback.static(path.dirname(NGAPP_INDEX)));

// assets in the development mode
if (isDevEnv) {
  app.use(loopback.static(path.resolve(__dirname, '../.tmp')));
  app.use('/bower_components',
    loopback.static(path.resolve(__dirname, '../bower_components')));
  app.use('/lbclient',
    loopback.static(path.resolve(__dirname, '../lbclient')));
}

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

// optionally start the app
app.start = function() {
  // start the web server
  return app.listen(function() {
    var host = app.get('host') || '0.0.0.0';
    var baseUrl = 'http://' + host + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('Web server listening at: %s', baseUrl);
  });
};

if (require.main === module) {
  app.start();
}
