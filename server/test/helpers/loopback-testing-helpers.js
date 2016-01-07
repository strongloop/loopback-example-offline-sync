var _describe = {};
var _it = {};
var _beforeEach = {};
var helpers = {
  describe: _describe,
  it: _it,
  beforeEach: _beforeEach
};
module.exports = helpers;

var assert = require('assert');
var request = require('supertest');
var expect = require('chai').expect;

_beforeEach.withApp = function(app) {
  if (app.models.User) {
    // Speed up the password hashing algorithm
    app.models.User.settings.saltWorkFactor = 4;
  }

  beforeEach(function() {
    this.app = app;
    var _request = this.request = request(app);
    this.post = _request.post;
    this.get = _request.get;
    this.put = _request.put;
    this.del = _request.del;
  });
};

_beforeEach.cleanDatasource = function(dsName) {
  beforeEach(function(done) {
    if (!dsName) dsName = 'db';

    if (typeof this.app === 'function' &&
        typeof this.app.datasources === 'object' &&
        typeof this.app.datasources[dsName] === 'object') {
      this.app.datasources[dsName].automigrate();
      this.app.datasources[dsName].connector.ids = {};
    }

    done();
  });
};

_beforeEach.withArgs = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  beforeEach(function() {
    this.args = args;
  });
};

_beforeEach.givenModel = function(modelName, attrs, optionalHandler) {
  var modelKey = modelName;

  if (typeof attrs === 'function') {
    optionalHandler = attrs;
    attrs = undefined;
  }

  if (typeof optionalHandler === 'string') {
    modelKey = optionalHandler;
  }

  attrs = attrs || {};

  beforeEach(function(done) {
    var test = this;
    var app = this.app;
    var model = app.models[modelName];
    assert(model, 'cannot get model of name ' + modelName + ' from app.models');
    assert(model.dataSource, 'cannot test model ' + modelName +
        ' without attached dataSource');
    assert(
      typeof model.create === 'function',
      modelName + ' does not have a create method'
    );

    model.create(attrs, function(err, result) {
      if (err) {
        console.error(err.message);
        if (err.details) console.error(err.details);
        done(err);
      } else {
        test[modelKey] = result;
        done();
      }
    });
  });

  if (typeof optionalHandler === 'function') {
    beforeEach(optionalHandler);
  }

  afterEach(function(done) {
    this[modelKey].destroy(done);
  });
};

_describe.whenCalledRemotely = function(verb, url, data, cb) {
  if (cb === undefined) {
    cb = data;
    data = null;
  }

  var urlStr = url;
  if (typeof url === 'function') {
    urlStr = '/<dynamic>';
  }

  describe(verb.toUpperCase() + ' ' + urlStr, function() {
    beforeEach(function(cb) {
      if (typeof url === 'function') {
        this.url = url.call(this);
      }
      this.remotely = true;
      this.verb = verb.toUpperCase();
      this.url = this.url || url;
      var methodForVerb = verb.toLowerCase();
      if (methodForVerb === 'delete') methodForVerb = 'del';

      if (this.request === undefined) {
        throw new Error('App is not specified. Please use lt.beforeEach.withApp to specify the app.');
      }

      this.http = this.request[methodForVerb](this.url);
      delete this.url;
      this.http.set('Accept', 'application/json');
      if (this.loggedInAccessToken) {
        this.http.set('authorization', this.loggedInAccessToken.id);
      }
      if (data) {
        var payload = data;
        if (typeof data === 'function')
          payload = data.call(this);
        this.http.send(payload);
      }
      this.req = this.http.req;
      var test = this;
      this.http.end(function(err) {
        test.req = test.http.req;
        test.res = test.http.res;
        delete test.url;
        cb();
      });
    });

    cb();
  });
};

_it.shouldBeAllowed = function() {
  it('should be allowed', function() {
    assert(this.req);
    assert(this.res);
    // expect success - status 2xx or 3xx
    expect(this.res.statusCode).to.be.within(100, 399);
  });
};
