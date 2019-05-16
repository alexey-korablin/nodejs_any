const fetch = require('node-fetch');

const status = (res) => {
    console.log(res.status);
    if (res.status >= 200 || res.status < 300) {
        return Promise.resolve(res);
    }
    return Promise.reject(new Error(res.statusText));
}

const json = (res) => res.json();

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(status)
    .then(json)
    .then(data => console.log('Request succeeded with JSON response', data))
    .catch(err => console.error(`Request failed ${err}`));