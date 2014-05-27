// dependencies
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-explorer');
var CONFIG = require('global.config');
var boot = require('loopback-boot');

// server
var server = module.exports = loopback();

boot(server, {
  appRootDir: path.resolve(__dirname),
  appConfig: {
    // No app config to load, we are processing it manually now
    // TODO(bajtos) modify Gulp to create app.* config files
  },
  models: {
    // No models to load, we are building them manually now
    // TODO(bajtos) Move model definitions to models.json
  }
});

var db = server.datasources.db;

// models
var User = require('models/user');
var Todo = require('models/todo');

// setup the model data sources
User.attachTo(db);
Todo.attachTo(db);
server.model(User);
server.model(Todo);

// TODO(ritch) this should be unecessary soon....
server.model(Todo.getChangeModel());

// root api path
var apiPath = CONFIG.api.root;

// enable authentication
// server.enableAuth();

// middleware
server.use(loopback.logger('dev'));
server.use(loopback.token());
server.use(apiPath, loopback.rest());
server.use('/explorer', explorer(server, {basePath: apiPath}));

