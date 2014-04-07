var loopback = require('loopback');
var app = loopback();
var CONFIG = require('global.config');

// template route
app.get('/views/:view', function(req, res) {
  res.render(req.params.view + '.ejs');
});

// locals
app.locals({
  title: 'Todo Example',
  CONFIG: CONFIG
});

// html5 routes
var routes = CONFIG.routes;

Object
  .keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    app.get(route, function(req, res) {
      res.render('app.ejs');
    });
  });

// load the client app bundle
var html5AppSrc = fs.readFileSync(CONFIG.html5Bundle);

app.get(CONFIG.bundleURL, function(req, res) {
  res.headers['Content-Type'] = 'text/javascript';
  res.send(html5AppSrc);
});
