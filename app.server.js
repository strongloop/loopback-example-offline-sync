// dependencies
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-explorer');
var remoting = require('strong-remoting');

// server
var server = module.exports = loopback();

// data source
var memory = loopback.memory();

// models
var User = require('./models/user');
var Todo = require('./models/todo');

// setup the model data sources
User.attachTo(memory);
Todo.attachTo(memory);

// root api path
var apiPath = '/api';

// enable authentication
server.enableAuth();

// middleware
server.use(loopback.static(path.join(__dirname, 'public')));
server.use(loopback.static(path.join(__dirname, 'bower_components', 'angular-route')));
server.use(loopback.token());
server.use(apiPath, loopback.rest());
server.use('/explorer', explorer(server, {basePath: apiPath}));

// locals
server.locals({
  title: 'Todo Example'
});

// view engine
server.engine('html', require('ejs').renderFile);

// home route
server.get('/', function(req, res) {
  var token = req.accessToken;
  var data = {me: undefined};

  if(token) {
    // TODO: fetch initial data
    res.render('home.ejs', data);
  } else {
    res.render('home.ejs', data);
  }
});

// template route
server.get('/views/:view', function(req, res) {
  res.render(req.params.view + '.ejs');
});

// html5 routes
var routes = require('./routes.browser.js');
Object
  .keys(routes)
  .forEach(function(route) {
    var routeDef = routes[route];
    server.get(route, function(req, res) {
      res.render('app.ejs');
    });
  });
