const WebSocket = require('ws');

// It needs to avoide using ws:// protocol. Instead use wss:// - secure version
// Creating WebSocket - connection
const url = 'wss://localhost:8083';
const connection = new WebSocket(url);

// In case success opening the connection listening can be organized by registering appropreate listener. It is 'onopen' listener
connection.onopen = () => {
    console.log('the data can be handled here');
    connection.send('hey!');
};

// To process errors needs to register onerror listener
connection.onerror = (err) => {console.log(err, 'Errors can be handled here')};

// To send some portion of data use send method
// connection.onopen = () => {
//     connection.send('hey');
// };

// To get some data from a server use onmessage method
connection.onmessage = (m) => {
    console.log(m.data);
};