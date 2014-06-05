var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var api = require('../api');

// TODO(ritch) should be configurable
var HOME_TEMPLATE = 'home.ejs';

// middleware
app.use(express.compress());

// view engine
app.engine('html', require('ejs').renderFile);

// fix the path to page templates - it is $pwd/views by default
app.set('views', path.join(__dirname, 'views'));

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

// TODO(ritch) html5 routes

