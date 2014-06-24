var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
var explorer = require('loopback-explorer');
var app = loopback();
var api = require('rest');

boot(app, __dirname);

// middleware
app.use(loopback.compress());

var isDevEnv = app.get('env') === 'development';
var NGAPP_INDEX = require.resolve(isDevEnv ?
  'ngapp/index.html' : 'ngapp/dist/index.html');

// html5 routes
var routes = require('ngapp/config/routes');
Object
  .keys(routes)
  .forEach(function(route) {
    app.get(route, function(req, res) {
      res.sendfile(NGAPP_INDEX);
    });
  });

// mount the API app and the API explorer
var restApiRoot = app.get('restApiRoot');
app.use(restApiRoot, api);
app.use('/explorer', explorer(api, { basePath: restApiRoot }));

// static ngapp
app.use(loopback.static(path.dirname(NGAPP_INDEX)));
if (isDevEnv) {
  app.use('/bower_components',
    loopback.static(path.resolve(__dirname, '../bower_components')));
  app.use('/lbclient',
    loopback.static(path.resolve(__dirname, '../lbclient')));
}

// start the web server
app.listen(function() {
  var host = app.get('host') || '0.0.0.0';
  var baseUrl = 'http://' + host + ':' + app.get('port');
  console.log('web server listening at: %s', baseUrl);
});
