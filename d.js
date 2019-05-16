const app = require('express')();

const port = 3030;

app.get('/', (req, res) => {
    res.send('Hi!');
});
app.listen(port, () => { console.log('Server ready') });

process.on('SIGTERM', () => {
    app.close();
});

setTimeout(() => { process.kill(process.pid, 'SIGTERM'), Math.ceil(Math.random() * 17000) });