var fs = require('fs');
var loopback = require('loopback');
var app = loopback();
var CONFIG = require('global.config');
var LOCAL_CONFIG = require('local.config');
var HOME_TEMPLATE = LOCAL_CONFIG.homeTemplate;
var api = require('api');

// middleware
app.use(loopback.compress());

// template data
app.locals({
  title: LOCAL_CONFIG.title,
  CONFIG: CONFIG
});

// load the client app bundle
var html5AppSrc = fs.readFileSync(CONFIG.html5Bundle, 'utf8');

// serve the browserify bundle from memory
app.get(CONFIG.bundleURL, function(req, res) {
  res.setHeader('Content-Type', 'text/javascript');
  res.send(html5AppSrc);
});

// view engine
app.engine('html', require('ejs').renderFile);

// html5 views
app.use('/views', loopback.static(CONFIG.html5Views));

// html5 routes
var routes = CONFIG.routes;
Object
  .keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    if(route === '/') return;
    app.get(route, function(req, res) {
      res.render(LOCAL_CONFIG.appTemplate);
    });
  });

// home route
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

// mount the api app
app.use(api);

// start the web server
app.listen(LOCAL_CONFIG.port, LOCAL_CONFIG.host, function() {
  console.log(['web server listening at: ',
    LOCAL_CONFIG.protocol || 'http',
    '://',
    LOCAL_CONFIG.host,
    ':',
    LOCAL_CONFIG.port
  ].join(''));
});
