// dependencies
var path = require('path');
var loopback = require('loopback');
var explorer = require('loopback-explorer');
var boot = require('loopback-boot');

// model definitions
require('../models');

// server
var server = module.exports = loopback();

boot(server, __dirname);

// middleware
server.use(loopback.logger('dev'));
server.use(server.get('restApiRoot'), loopback.rest());
server.use('/explorer', explorer(server));
