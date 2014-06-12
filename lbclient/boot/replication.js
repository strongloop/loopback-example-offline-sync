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

  client.network = {
    _isConnected: true,
    get isConnected() {
      console.log('isConnected?', this._isConnected);
      return this._isConnected;
    },
    set isConnected(value) {
      this._isConnected = value;
    }
  };

  // setup model replication
  function sync(cb) {
    if (client.network.isConnected) {
      RemoteTodo.replicate(LocalTodo, function() {
        LocalTodo.replicate(RemoteTodo, cb);
      });
    }
  }

  // sync local changes if connected
  LocalTodo.on('changed', sync);
  LocalTodo.on('deleted', sync);

  client.sync = sync;
};
