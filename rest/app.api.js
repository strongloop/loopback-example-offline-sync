// dependencies
var loopback = require('loopback');
var boot = require('loopback-boot');

// server
var server = module.exports = loopback();

boot(server, __dirname);

// middleware
server.use(loopback.rest());
