const EventEmitter = require('events').EventEmitter;

const eventEmitter = new EventEmitter();

eventEmitter.on('start', (num) => console.log('Started! #', num));

eventEmitter.emit('start', 9);