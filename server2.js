const net = require('net');
const fs = require('fs');
// const port = process.env.PROT || 3000;

const chatLogFile = __dirname + '/chatlog.txt';

let clientArray = [];
let counter = 0;



let server = net.createServer(client => {

    // note createServer()
    // server code needs to be within brackets
     client.write('Welcome to the chat server'); // uncomment for original
    // socket.write(welcomeMsg);

    counter++;
    client.chatUserNumber = counter;
    let welcomeMsg = `Welcome to the chat: ${client.chatUserNumber}\n`;
    clientArray.push(client);
    //console.log(clientArray);
    client.setEncoding('utf8');
    client.write(`Welcome to the chat\n`);

    function addText(welcomeMsg) {
        fs.appendFile(chatLogFile, welcomeMsg, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The "data to append" was appended to file!');
        });
    }

    client.on('data', data => {
        clientArray.forEach(user => {
            if(user !== client) {

                let message = `Guest${client.chatUserNumber}: ${data}`;

               // console.log(`Guest${client.chatUserNumber}: ${data}`);
                user.write(message);
                addText(message);
            }
        });
        console.log(data);
    });

    client.on('close', () => {
        clientArray.forEach(user => {
            if(user !== client) {
                let message = `Guest${client.chatUserNumber}: Has Disconnected`;
               // console.log(`Guest${client.chatUserNumber}: Has Disconnected`);
               // user.write(`Guest${client.chatUserNumber}: Has Disconnected`);
                user.write(message);
                addText(message);
                clientArray.splice((client.chatUserNumber -1), 1);
            }
        });
    });

}).listen(5000);

console.log('listening on port 5000');