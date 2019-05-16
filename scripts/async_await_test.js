const getPause = () => Math.ceil(Math.random() * 3000);

const doSmthAsync = () => {
    return new Promise((res, rej) => {
        const pause = getPause();
        console.log(`Work in ${pause/1000}sec`)
        setTimeout(res, pause, 'I did something');
    });
}

const doSmth = async () => {
    console.log(await doSmthAsync());
}

doSmth();