// TCP socket stuff
if ( tcp ) {
  var ruppells_sockets_port = process.env.RUPPELLS_SOCKETS_LOCAL_PORT || 1337;
  net = require('net');
  net.createServer(function (socket) {
    var name = "TCP -> " + socket.remoteAddress + ":" + socket.remotePort
    peeps[name] = {
      'send' : function(message, sender) { socket.write(sender + " said " + message + "\n") }
    };
    socket.write("Welcome " + name + "\n");
    joined(name);
    socket.on('data', function (data) {
      broadcast(data.toString().replace(/(\r\n|\n|\r)/gm,""), name);
    });
    socket.on('close', function (had_error) {
      if (had_error) {
        console.log("I closed due to an error!");
      }
      left(name);
    });
  }).listen(ruppells_sockets_port);
  console.log("TCP listening on " + ruppells_sockets_port);
}
