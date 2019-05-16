// Получить данный об ОС можно с помощью модуля os
// .EOL - свойство хранящее используемый в системе разделитель строки \n - для Linux и MacOS и \r\n - для Windows

const os = require('os');
const EventEmitter = require('events');
const http = require('http');

const index = process.argv[2];

// Сведения о константах хранятся в объекте .constants для просмотра констант для сигналов нужно обратиться к объекту.signals . Он хранит константы для сигналов, таких как SIGKILL, SIGHUP и т.д.

function showSignalConstants() {
    console.log(os.constants.signals);
}

// Константы для сообщений об ошибках находятся в .constants.errno

function showErrorConstants() {
    console.log(os.constants.errno);
}

// .arch() - возвращает сведения об архитектуре системы

function getArch() {
    console.log(os.arch());
}

// .cpus() - возвращает информацию о ЦП

function getCPUs() {
    console.log(os.cpus());
}

// .endianness() - возвращает BE или LE в зависимости от того какой порядок байт был выбран при компиляции бинарного файла NodeJS

function getEndianness() {
    const byteOrder = os.endianness();
    const BE = 'Big Engian';
    const LE = 'Little Endian';
    if (byteOrder === 'BE') {
        console.log(`Node was compiled by ${BE}\nBytes order is ${byteOrder}`);
    } else if (byteOrder === 'LE') {
        console.log(`Node was compiled by ${LE}\nBytes order is ${byteOrder}`);
    }
}

// .freemem() - возвращает количество свободной памяти в байтах

function getFreeMemory() {
    const memoryAmount = os.freemem();
    const TO_MBS = 1000000;

    console.log(`Amount of unused memory approximately is ${Math.floor(memoryAmount / TO_MBS)}MB\nTotal amount of memory in bytes is ${memoryAmount}`)
}

// .homedir() - возвращает путь к домашней директории пользователя

function getHomeDir() {
    console.log(`The home directory is ${os.homedir()}`);
}

// .hostname() - возвращает имя хоста

function getHostName() {
    console.log(`The name of host is ${os.hostname()}`);
}

// .loadavg() - возвращает массив средние значения загрузки ЦП. В Windows возвращает нули

function getAverageLoading() {
    console.log(os.loadavg());
}

// .networkInterfaces - возвращает сведения о сетевых интерфейсах

function getNetworkInterfaces() {
    console.log(os.networkInterfaces());
}

// .platform() - возвращает информацию о платформе

function getPlatformInfo() {
    console.log(os.platform());
}

// .release() - возвращает номер релиза ОС

function getReleaseNumber() {
    console.log(os.release());
}

// .tmpdir() - возвращает путь к темповой папке

function getPathToTemp() {
    console.log(os.tmpdir());
}

// .totalmem() - возвращает общее количество системной памяти в байтах

function getTotalMemory() {
    const totalMemoryAmount = os.totalmem();
    const TO_MBS = 1000000;

    console.log(`Amount of memory approximately is ${Math.floor(totalMemoryAmount / TO_MBS)}MB\nTotal amount of memory in bytes is ${totalMemoryAmount}`)
}

// .type() - возвращает тип операционной системы

function getOSType() {
    const osType = os.type();
    if (osType === 'Linux') {
        console.log(`Type of your OS is Linux (${osType})`);
    } else if (osType === 'Darwin') {
        console.log(`Type of your OS is MacOS (${osType})`);
    } else if (osType === 'Windows_NT') {
        console.log(`Type of your OS is Windows (${osType})`);
    } else {
        console.log(`Couldn't identify the type of OS on this machine (${osType})`);
    }
}

// .uptime() - возвращает время работы в секундах с последней перезагрузки

function calculatePeriod(uptime) {
    const MINUTE = 60;
    const HOUR = 60;
    const DAY = 24;

    const secondsPerDay = MINUTE * HOUR * DAY;
    const secondsPerHour = MINUTE * HOUR;

    const days = Math.floor(uptime / secondsPerDay);
    const hours = Math.floor((uptime - (days * secondsPerDay)) / secondsPerHour);
    const minutes = Math.floor((uptime - (days * secondsPerDay + hours * secondsPerHour)) / MINUTE);
    const seconds = Math.floor(uptime - (days * secondsPerDay + hours * secondsPerHour + minutes * MINUTE));
    
    return { days, hours, minutes, seconds };
}

function getUptime() {
    const uptime = os.uptime();
    const MINUTE = 60;

    const time = calculatePeriod(uptime);

    console.log(`This machine works for ${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds from the last reboot`);
}

// Модуль events предоставляет класс EventEmitter который предназначен для работы с событиями
// После подключения модуля events необходимо создать новый объект EventEmitter

const emitter = new EventEmitter();

// newListener - событие вызывается при добавлении нового обработчика событий
// removeListener - событие вызывается при удалении обработчика событий
// Некторые наиболее полезные методы:
//  .addListener() - псевдоним для emitter.on()
//  .emit() - генерирует событие. Синхронно вызывает события в порядке их регистрации
//  .eventNames() - возвращает массив зарегистрированных событий
//  .getMaxListeners() - возвращает максимальное число обработчиков событий, которые можно добавить объекту EventEmitter. По умолчанию - 10. .setMaxListeners() - меняет дефолтное значение
//  .listenerCount() - возвращает количество зарегистрированных обработчиков по имени переданному в качестве параметра
//  .listeners() - возвращает количество зарегистрированных обработчиков по имени переданному в качестве параметра
//  .off() - псевдоним для метода emitter.removeListener() ( >= Node 10)
//  .on() - регистрирует коллбэк, который вызывается при генерации события
//  .once() - регистрирует коллбэк, который вызывается только раз
//  .prependListener() - добавляет обработчик вначало очереди обработчиков событий
//  .prependOnceListener() - добавляет обработчик вначало очереди обработчиков событий и вызывается один раз
//  .removeAllListeners() - удаляет все обработчики события по переданному имени
//  .removeListener() - удаляет заданный обработчик по имени
//  .setMaxListeners() - меняет дефолтное значение максимального количества обработчиков для отдельного события

// Модуль http предназначен для создания http-серверов.
// Модуль http содержит ряд свойств:
// .METHODS - содержит все доступные методы

function showAllowedHTTPMethods() {
    console.log(http.METHODS);
}

// .STATUS_CODES - содержит все коды состояния http и их описания

function showHTTPStatusCodes() {
    console.log(http.STATUS_CODES);
}

// .globalAgent - свойство указывает на глобальный экземпляр класса .Agent (используется для управления соединениями)

// Методы модуля http
//  .createServer() - возвращает новый экземпляр класса .Server
//  .request() - позволяет выполнить http-запрос к серверу (создает экземпляр .ClientRequest)
//  .get() - похож на .request(), но автоматически устанавливает метод GET и вызывает req.end()
// Классы модуля http
//  .Agent - используется для управления соединениями. Он применяется в качестве значения по умолчанию для всех http-запросов и обеспечивает постановку запросов в очередь и повторное использование сокетов. Он поддерживает пул сокетов (позволяет поддерживать высокую производительность сетевой подсистемы.)
//  .ClientRequest - является выполняющимся запросом. Создается при вызове .request() и .get() . При получении ответа на запрос вызывается событие response, в котором передается ответ (.IncomingMessage). После выполнения запроса данные можно обработать либо вызовом метода response.read(), либо в обработчике события response настроить прослушивание события "data" - это позволит работать с потоковыми данными
//  .Server - экземпляр создается вызовом .createServer(). После становятся доступны методы:
//      .listen() - запускает сервер и организовывает обработку входящих запросов
//      .close() - останавливает сервер
//  .ServerResponse() - объект создается классом .Server() и передается в качестве второго аргумента событию request. Например: http.CreateServer((req, res) => {...}). В этом обработчике для отправки ответа вызывается метод res.end()
//  Методы для работы с http-заголовками:
//      .getHeaderNames() - возвращает список имен установленных заголовков
//      .getHeaders() - возвращает копию установленных заголовков
//      .setHeader('headerName', value) - устанавливает значение для заданного заголовка
//      .getHeader('headerName') - возвращает установленный заголовок
//      .removeHeader('headerName') - удаляет установленный заголовок
//      .hasHeader('headerName') - возвращает истину если в ответе уже есть заголовок с именем переданным в аргументе
//      .headersSent() - возвращает истину если заголовки уже переданы клиенту
//  Отправка заголовков выполняется методом .writeHead(<kode>, <'kode_status_message'>, <{headers}>)
//  Для отправки данных клиенту в теле ответа используется метод .write(<Buffer>). Если заголовки еще не были отправлены методом .writeHead(), нужно сначала установить код и код состояния методами response.statusCode = <kode> и response.statusMessage = <'status message'>
//  .IncommingMessage - объект данного класса создается при работе http.Server (обработка события request) и http.ClientRequest (обработка события response). Данные ответа представлены в виде потока (используется интерфейс Readable Stream). Может быть использован для работы с данными ответа:
//      .statusCode и .statusMessage - используются для получения кода состояния ответа и соответствующего сообщения
//      .headers или .rawHeaders - содержат заголовки ответов. (второе свойство - для получения необработанных заголовков)
//      .method - хранит метод запроса
//      .httpVersion - хранит данные от используемой версии http
//      .url - хранит URL
//      .socket - хранит объект net.Socket связанный с соединением

// ПОТОКИ
// Потоки реализует модуль stream

function processStream() {
    const fs = require('fs');
    
    const server = http.createServer((req, res) => {
        const stream = fs.createReadStream(__dirname, '../assets/text.txt');
        stream.pipe(res);
    });

    server.listen(3049, 'localhost', () => console.log('Server listen on http://localhost:3049'))
}

// метод pipe() - даный метод берет данные из источника и передает их в место назначения. Вызывается он на потоке являющемся источником данных. Данный метод может быть объединен в цепочки. Записи src.pipe(dest1).pipe(dest2) и src.pipe(dest1); dest1.pipe(dest2) - эквивалентны

// API nodejs в которых используются потоки:
//  - process.stdin - возвращает поток, подключенный к stdin
//  - process.stdout - возвращает поток, подключенный к stdout
//  - process.stderr - возвращает поток, подключенный к stderr
//  - fs.createReadStream() - создает читаемый поток для работы с файлом
//  - fs.createWriteStream() - создает записываемый поток для работы с файлом
//  - net.connect() - инициирует соединение основанное на потоке
//  - http.request() - возвращает экземпляр класса http.ClientRequest, предоставляющий доступ к записываемому потоку
//  - zlib.createGzip - сжимает данные алгоритмом gzip и отправляет их в поток
//  - zlib.createGunzip() - выполняет декомпрессию gzip-потока
//  - zlib.createDeflate() - сжимает данные алгоритмом deflate и отправляет их в поток
//  - zlib.createInflate() - выполняет декомпрессию deflate-потока

// Типы потоков:
// - Readable - поток из которого можно читать данные. При загрузке данных они буферизуются до того как получатель данных не приступит к их чтению
// - Writable - поток в который можно вести запись.
// - Duplex - комбинация Readable и Writable потоков
// - Transform - похож на дуплексный поток, но разница в том, что то, что поступает на вход потоков преобразует то, что из них можно прочитать

// Создание потока для чтения

function createReadableStream() {
    const Stream = require('stream');

    const readableStream = new Stream.Readable()

    // Сохранение данных в поток для дальнейшего прочтения
    readableStream.push('hi!');
    readableStream.push('ho!');
}

// Создание потока для записи

function createWritableStream() {
    const Stream = require('stream');

    const writableStream = new Stream.Writable();

    // Реализация метода _write()
    writableStream._write = (chunk, encoding, next) => {
        console.log(chunk.toString());
        next();
    }

    // Подключение потока чтения
    process.stdin.pipe(writableStream);
}

// Получение данных из потока для чтения

function getDataFromReadableStream() {
    const Stream = require('stream');

    const readableStream = new Stream.Readable();
    const writableStream = new Stream.Writable();

    writableStream._write = (chunk, encoding, next) => {
        console.log(chunk.toString());
        next();
    }

    // Передаем поток из потока для чтения в поток для записи
    readableStream.pipe(writableStream);

    // Можно работать с потокм для чтения напрямую
    readableStream.on('readable', () => console.log('From listener -> ', readableStream.read().toString()));

    // Добавляем данные в поток для чтения
    readableStream.push('Hi!');
    readableStream.push('Ho!');
    // Оканчиваем чтение
    readableStream.push(null);
}

const startDemo = function (index) {
    switch (index) {
        case '1':
            showSignalConstants();
            break;
        case '2':
            showErrorConstants();
            break;
        case '3':
            getArch();
            break;
        case '4':
            getCPUs();
            break;
        case '5':
            getEndianness();
            break;
        case '6':
            getFreeMemory();
            break;
        case '7':
            getHomeDir();
            break;
        case '8':
            getHostName();
            break;
        case '9':
            getAverageLoading();
            break;
        case '10':
            getNetworkInterfaces();
            break;
        case '11':
            getPlatformInfo();
            break;
        case '12':
            getReleaseNumber();
            break;
        case '13':
            getPathToTemp();
            break;
        case '14':
            getTotalMemory();
            break;
        case '15':
            getOSType();
            break;
        case '16':
            getUptime();
            break;
        case '17':
            showAllowedHTTPMethods();
            break;
        case '18':
            showHTTPStatusCodes();
            break;
        case '19':
            processStream();
            break;
        case '20':
            createReadableStream();
            break;
        case '21':
            createWritableStream();
            break;
        case '22':
            getDataFromReadableStream();
            break;
        default:
            console.log('No such index!');
    }
}(index);