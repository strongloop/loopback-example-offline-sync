'use strict';

var lt = require('loopback-testing');
var assert = require('assert');
var app = require('../server.js'); //path to app.js or server.js

describe('Todo', function() {
  lt.beforeEach.withApp(app);
  lt.beforeEach.givenModel('Todo');

  // New todo
  describe('New todo empty data', function() {

    lt.describe.whenCalledRemotely('POST', '/api/Todos', {}, function() {
      lt.beforeEach.cleanDatasource();

      lt.it.shouldBeAllowed();
      it('should have statusCode 200', function() {
        assert.equal(this.res.statusCode, 200);
      });

      it('should respond with a new todo', function() {
        var guidRegex = /[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/;
        assert(this.res.body.id.match(guidRegex));
      });
    });

  });

  // New todo with id
  describe('New todo with id set', function() {

    lt.beforeEach.cleanDatasource();
    lt.describe.whenCalledRemotely('POST', '/api/Todos', {
      id: '123',
      title: 'Sample',
      completed: true,
      created: 1024
    }, function() {

      it('should respond with given todo', function() {
        assert.equal(this.res.body.id, 123);
        assert.equal(this.res.body.title, 'Sample');
        assert.equal(this.res.body.completed, true);
        assert.equal(this.res.body.created, 1024);
      });

      // Find todo in the list of todos
      lt.describe.whenCalledRemotely('GET', '/api/Todos', function() {

        it('should contain the todo', function() {
          var found = false;
          this.res.body.forEach(function(todo) {
            if (todo.id === '123') {
              found = true;
            }
          });
          assert(found);
        });

      });

      // Get todo stats
      lt.describe.whenCalledRemotely('POST', '/api/Todos/stats', function() {
        lt.it.shouldBeAllowed();
        it('should respond with 1 total, 0 remaining and 1 completed', function() {
          assert.equal(typeof this.res.body, 'object');
          assert.equal(this.res.body.stats.remaining, 0);
          assert.equal(this.res.body.stats.completed, 1);
          assert.equal(this.res.body.stats.total,1);
        });
      });

      // Set task as not completed
      lt.describe.whenCalledRemotely('PUT', '/api/Todos/123', {
        id: 123,
        completed: false
      }, function() {
        it('should respond with todo:123 as uncompleted', function() {
          assert.equal(typeof this.res.body, 'object');
          assert.equal(this.res.body.completed, false);
        });
      });

      // Get the specific todo
      lt.describe.whenCalledRemotely('GET', '/api/Todos/123', function() {
        it('should respond with todo:123', function() {
          assert.equal(typeof this.res.body, 'object');
          assert.equal(this.res.body.id, 123);
        });
      });

      // Delete the created todo
      lt.describe.whenCalledRemotely('DELETE', '/api/Todos/123', function() {
        it('should respond with status 204 - todo:123 deleted', function() {
          assert.equal(this.res.statusCode, 204);
        });

        // Try to find it -- should return not found
        lt.describe.whenCalledRemotely('GET', '/api/Todos/123', function() {
          it('should respond with status 404 - todo:123 not found', function() {
            assert.equal(this.res.statusCode, 404);
          });
        });
      });
    });

  });

});
