var sys = require('sys');
var net = require('net');
var sockets = [];
var name = [];
var t=0;
net.createServer(function(sock) {
    sys.puts('Connected with : ' + sock.remoteAddress + ':' + sock.remotePort); 
    sock.write('welcome to lokic chat app ' + sock.remoteAddress + ':' + sock.remotePort + '\n');
    sock.write('enter your user name to be used : ');
    t=1;
    sock.on('data', function(data) {  
        if(t == 1){
            sock.name = data.slice(0,-1);
            sockets.push(sock);
            t=0;
        }
        else{
        var len = sockets.length;
        for (var i = 0; i < len; i ++) {
            if (sockets[i] != sock) {
                if (sockets[i]) {
                    sockets[i].write(sock.name + ' : ' + data);
                }
            }
        }
        sys.puts(  sock.name + ' : ' +  data);}
    });
    sock.on('error',function(){});
    sock.on('close', function() { 
        sys.puts('Disconnected: ' +   sock.name + '\n');
        var idx = sockets.indexOf(sock);
        if (idx != -1) {
            delete sockets[idx];
        }
    });
    sock.on('end', function() { 
        sys.puts('Disconnected: ' +   sock.name + '\n');
        var idx = sockets.indexOf(sock);
        if (idx != -1) {
            delete sockets[idx];
        }
    });
}).listen(8080,'127.0.0.1');
 
sys.puts('Server Created ' +  '\n');
