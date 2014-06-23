var path = require('path');
var fs = require('fs');
var loopback = require('loopback');
var boot = require('loopback-boot');
var explorer = require('loopback-explorer');
var app = loopback();
var CONFIG = require('global.config');
var api = require('rest');

boot(app, __dirname);

// middleware
app.use(loopback.compress());

// template data
app.locals.title = app.get('title').replace('{{env}}', app.get('env'));
app.locals.CONFIG = CONFIG;

// view engine
app.engine('html', require('ejs').renderFile);

// fix the path to page templates - it is $pwd/views by default
app.set('views', path.join(__dirname, 'views'));

// html5 routes
var routes = require('html5/config.routes');
var APP_TEMPLATE = app.get('appTemplate');
Object
  .keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    if(route === '/') return;
    app.get(route, function(req, res) {
      res.render(APP_TEMPLATE);
    });
  });

// home route
var HOME_TEMPLATE = app.get('homeTemplate');
app.get('/', function(req, res) {
  var token = req.accessToken;
  var data = {me: undefined};

  if(token) {
    // TODO: fetch initial data
    res.render(HOME_TEMPLATE, data);
  } else {
    res.render(HOME_TEMPLATE, data);
  }
});

// mount the API app and the API explorer
var restApiRoot = app.get('restApiRoot');
app.use(restApiRoot, api);
app.use('/explorer', explorer(api, { basePath: restApiRoot }));

// html5 views
app.use('/views', loopback.static(CONFIG.html5Views));

// static css
app.use('/css', loopback.static(app.get('staticCSS')));

// static html5 bundle
app.use(loopback.static(path.dirname(CONFIG.html5Bundle)));

// start the web server
app.listen(function() {
  var host = app.get('host') || '0.0.0.0';
  var baseUrl = 'http://' + host + ':' + app.get('port');
  console.log('web server listening at: %s', baseUrl);
});
