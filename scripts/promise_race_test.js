const getPause = () => Math.ceil(Math.random() * 3000);

const first = new Promise((res, rej) => {
    const pause = getPause();
    console.log(`pause 1 is ${pause}`);
    setTimeout(res, pause, 'first');
});

const second = new Promise((res, rej) => {
    const pause = getPause();
    console.log(`pause 2 is ${pause}`);
    setTimeout(res, pause, 'second');
});

Promise.race([first, second]).then(res => console.log(res));