var loopback = require('loopback');
var boot = require('loopback-boot');

// model definitions
require('../models');
require('./models/index');

var client = module.exports = loopback();
boot(client);
