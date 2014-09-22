/**
 * Created with ysk8-tcp-node.
 * User: ysk8
 * Date: 2014-09-22
 * Time: 05:25 AM
 * To change this template use Tools | Templates.
 */
var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
    console.log('server connected');
    c.on('end', function() {
        console.log('server disconnected');
    });
    c.write('hello\r\n');
    c.pipe(c);
});
server.listen(3000, function() { //'listening' listener
    console.log('server bound');
});