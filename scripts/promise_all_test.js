const fetch = require('node-fetch');

const t1 = fetch('https://jsonplaceholder.typicode.com/todos/1');
const t2 = fetch('https://jsonplaceholder.typicode.com/todos/2');

Promise.all([t1, t2]).then(([res1, res2]) => {
    console.log(`Result 1: ${res1}, result 2: ${res2}`);
}).catch(err => console.error(err));