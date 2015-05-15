var loopback = require('loopback');
var boot = require('loopback-boot');

var client = module.exports = loopback();
boot(client);

module.exports.proquint = require('proquint');
module.exports.Buffer = Buffer;
