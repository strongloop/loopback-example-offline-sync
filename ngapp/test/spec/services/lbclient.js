'use strict';

describe('Service: lbclient', function () {

  // load the service's module
  beforeEach(module('loopbackExampleFullStackApp'));

  it('should provide Todo model', function() {
    inject(function(Todo) {
      expect(Todo).toBeDefined();
    });
  });

  it('should provide `sync()` function', function() {
    inject(function(sync) {
      expect(typeof sync).toBe('function');
    });
  });

  it('should provide `network` object', function() {
    inject(function(network) {
      expect(network).toBeDefined();
    });
  });
});
