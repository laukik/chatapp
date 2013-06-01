var sys = require('sys');
var net = require('net');
var sockets = [];
var name = [];
var t=0;
var svr = net.createServer(function(sock) {
    sys.puts('Connected with : ' + sock.remoteAddress + ':' + sock.remotePort); 
    sock.write('welcome to lokic chat app ' + sock.remoteAddress + ':' + sock.remotePort + '\n');
    sock.write('enter your user name to be used : ');
    t=1;
    sock.on('data', function(data) {  // client writes message
        if (data == 'exit\n') {
            sys.puts('exit command received: ' + sock.remoteAddress + ':' + sock.remotePort + '\n');
            sock.destroy();
            var idx = sockets.indexOf(sock);
            if (idx != -1) {
                delete sockets[idx];
            }
            return;
        }
        if(t == 1){
            sock.name = data.slice(0,-1);
            sockets.push(sock);
            t=0;
        }
        else{
        var len = sockets.length;
        for (var i = 0; i < len; i ++) { // broad cast
            if (sockets[i] != sock) {
                if (sockets[i]) {
                    sockets[i].write(sock.name + ' : ' + data);
                }
            }
        }
        sys.puts(  sock.name + ' : ' +  data);}
    });
    sock.on('end', function() { // client disconnects
        sys.puts('Disconnected: ' + data + data.remoteAddress + ':' + data.remotePort + ' : ' +  sock.name + ' : ' +  '\n');
        var idx = sockets.indexOf(sock);
        if (idx != -1) {
            delete sockets[idx];
        }
    });
});
 
var svraddr = '127.0.0.1';
var svrport = 8080;
 
svr.listen(svrport, svraddr);
sys.puts('Server Created at ' + svraddr + ':' + svrport + '\n');
