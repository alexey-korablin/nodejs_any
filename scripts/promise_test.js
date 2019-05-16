const done = Math.random() > 0.5;
const pause = Math.ceil(Math.random() * 2000);

const isItDoneYet = new Promise((res, rej) => {
    if (done) {
        const doneInfo = 'Work has been done';
        res(doneInfo);
    } else {
        const failInfo = 'Work has been failed';
        rej(failInfo);
    }
});

const checkIfItsDone = () => {
    isItDoneYet.then(res => console.log(res)).catch(err => console.error(err));
}

console.log(`Work will be started in ${pause/1000}sec`);

setTimeout(checkIfItsDone, pause);