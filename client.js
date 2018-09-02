const net = require('net');

let socket = net.createConnection({port:5000}, () => {
    console.log('Connected');
});


socket.setEncoding('utf8');
process.stdin.pipe(socket); // takes the output of stdin and sends to client (typing in terminal).
socket.on('data', data => {
    console.log(data);
});

// Open 3 or more terminals, type in client terminal for server response/save to chatlog.txt

