const express = require('express');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3056;

const app = express();

const phrases = [
    'const http = require(\'http\')',
    'const port = 3000',
    'res.statusCode = 200',
    'Hi!'
]

console.log(process.argv);

const getPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];
if (Math.random() > 0.2) {
    // Server based on http-module
    const server = http.createServer((req, res) => {
        console.log(Object.keys(req));
        res.statusCode = 200;
        res.setHeader('content-Type', 'text/plain');
        res.end(getPhrase());
    });

    server.listen(port, hostname, () => { 
        console.log(`Server is run at http://${hostname}:${port}`);
        processTermination();
    });

} else {
    // Server based on express-framework
    app.get('/', (req, res) => {
        res.send(getPhrase());
    })

    app.listen(port,  () => { 
        console.log(`Server ready`);
        processTermination()
    });
}

function processTermination() {
    const pid = getProcessPID();
    const terminateTime = getTerminateTime();
    startTermination(pid, terminateTime);
}

function getProcessPID() {
    console.log(process.pid);
    return process.pid;
}

function getTerminateTime() {
    return Math.ceil(Math.random() * 17000);
}

function startTermination(pid, time) {
    const signal = 'SIGTERM';
    console.log(`Server will be terminated in ${time/1000} sec`);
    setTimeout(() => {process.kill(pid, signal)}, time, pid, signal);
}

process.on('SIGTERM', () => {
    console.log('server terminated - 1');
    server.close(() => { console.log('server terminated - 2') });
});

(function () {
    console.log('Environment variables');
    console.log(process.env.NODE_ENV);
} ());