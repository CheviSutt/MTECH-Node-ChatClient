const net = require('net');

let clients = [];
let server = net.createServer(client => {

    clients.push(client);
    client.write("Welcome to the chat server!");



    client.setEncoding('utf8');
    client.on('data', chunk => {
        // clients.forEach(user) => {
        //     if(user !== client) {
        //         user.write(`guest: ${data}`);
        //     }
        // }

        console.log('client :' + chunk );
        client.write(`Echo from server :`);
        client.write(chunk);
    });
    client.on('end', () =>{
        console.log('Client quits');
    });



    //Server code here
    }).listen(5000);

console.log('Listening on port 5000');


// if(client = this.client) {
//
// }
