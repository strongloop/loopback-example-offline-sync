'use strict';

// load lbclient via browserify's require
var client = (function() {
  /*global require:true*/
  return require('lbclient');
})();

/**
 * @ngdoc service
 * @name loopbackExampleFullStackApp.lbclient
 * @description
 * # lbclient
 * Value in the loopbackExampleFullStackApp.
 */
angular.module('loopbackExampleFullStackApp')
  .value('Todo', client.models.LocalTodo)
  .value('RemoteTodo', client.models.RemoteTodo)
  .value('sync', client.sync)
  .value('network', client.network);
