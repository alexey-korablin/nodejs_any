const https = require('https');

const data = JSON.stringify({
    todo: 'buy milk'
});

// It is possible performing PUT and DELETE requests. To do this use method 'PUT' 
// or DELETE accordingly 
const options = {
    hostname: 'flaviocopes.com',
    port: 443,
    path: '/todos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', err => console.error(e));

req.write(data);

req.end();