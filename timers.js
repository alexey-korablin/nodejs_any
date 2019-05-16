console.log('Simple log');
setImmediate(() => console.log('immediate timer'));
setTimeout(() => console.log('setTimeout timer'), 0);
process.nextTick(() => console.log('next tick timer'));
