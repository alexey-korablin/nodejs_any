const chalk = require('chalk');
const Progress = require('progress');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(process.env.PORT);
console.log(process.argv);

const bar = new Progress('bar:', {total: 10});

console.log(chalk.yellow('The app is loading'));

const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
        runQuestion();
    }
});

function runQuestion() {
    readline.question(`${chalk.green("What's your name?")}\n${chalk.red('--->')}`, (answer) => {
        console.log(`${chalk.inverse('Hello, ' + answer)}`);
        readline.close();
    });
}