const https = require('https');

const options = {
    hostname: 'flaviocopes.com',
    port: 443,
    path: '/todos',
    method: 'GET'
};
const req = https.request(options, (res) => {
    console.log(`status code: ${res.statusCode}`);
    res.on('data', (data) => { process.stdout.write(data) });
});

req.on('error', (e) => { console.error(e) });

req.end();