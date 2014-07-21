var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// middleware
app.use(loopback.compress());

// it's important to register the livereload middleware
// after any response-processing middleware like compress,
// but before any middleware serving actual content
var livereload = app.get('livereload');
if (livereload) {
  app.use(require('connect-livereload')({
    port: livereload
  }));
}

// boot scripts mount components like REST API
boot(app, __dirname);

// Mount static files like ngapp
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
app.use(loopback.static(path.dirname(app.get('indexFile'))));

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
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

if (require.main === module) {
  app.start();
}
