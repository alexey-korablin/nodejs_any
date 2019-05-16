const Progress = require('progress');

const bar = new Progress(':bar', { total: 10 });
const timer = setInterval(() => {
    bar.tick();
    if ( bar.complete ) {
        clearInterval(timer);
        console.clear();
    }
}, 400);