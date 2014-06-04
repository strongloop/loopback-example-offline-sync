// TODO(bajtos) Move the bi-di replication to loopback core,
// add model settings to enable the replication.
// Example:
//  LocalTodo: { options: {
//    base: 'Todo',
//    replicate: {
//      target: 'Todo',
//      mode: 'push' | 'pull' | 'bidi'
//    }}}
module.exports = function(client) {
  var LocalTodo = client.models.LocalTodo;
  var RemoteTodo = client.models.Todo;

  // setup model replication
  function sync(cb) {
    if (window.connected()) {
      RemoteTodo.replicate(LocalTodo, function() {
        LocalTodo.replicate(RemoteTodo, cb);
      });
    }
  }

  // sync local changes if connected
  LocalTodo.on('changed', sync);
  LocalTodo.on('deleted', sync);

  client.sync = sync;

  window.isConnected = true;

  window.connected = function connected() {
    console.log('isConnected?', window.isConnected);
    return window.isConnected;
  };
};
