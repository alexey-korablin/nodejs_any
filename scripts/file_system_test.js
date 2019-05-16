const fs = require('fs');

const args = process.argv[2];


// .open() - асинхронный метод, позволяющий получить файловый дескриптор
function doFsOpen() {
    fs.open('../assets/text.txt', 'r', (err, fd) => {
        if (err) {
            console.error(err);
        }
        console.log(fd);
    });
}

// Дескрипторы:
//  * r+ - открыть файл для чтения и для записи
//  * w+ - открыть файл для чтения и для записи с начала файла. Если файла нет - он создается
//  * a - открыть файл для записи в конец файла. Если файла нет - он создается
//  * a+ - открыть файл для чтения и записи в конец файла. Если файла нет - он создается

function getFileStats() {
    console.log('getFileStats started');
    fs.stat('../assets/text.txt', (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stats);
        const isFile = stats.isFile();
        const isDirectory = stats.isDirectory();
        const isSymbolicLink = stats.isSymbolicLink();
        const fileSize = stats.size;
        console.log(`Is it a file? ${isFile}
Is it a directory? ${isDirectory}`);
        console.log(`Is it symbolic link? ${isSymbolicLink}`);
        console.log(`The size of the file is ${fileSize}`)
    });
}

// Для работы с путями файлов используется модуль path

function getPathAndDoThings() {
    const path = require('path');
    const filePath = '../assets/text.txt';

    const dirname = path.dirname(filePath);
    const basename = path.basename(filePath);
    const extname = path.extname(filePath);
    const extfreename = path.basename(filePath, extname);

    console.log(`directory of the file is ${dirname}
file name is ${basename}
file name without extantion is ${extfreename}
the extension of the file is ${extname}`);

    // Объединение путей .join()
    const name = 'assets';
    const joinedPath = path.join('../', name, 'text.txt');
    console.log('joined path is --> ', joinedPath);

    // Получить абсолютный путь по относительному - .resolve()
    const resolvedPath = path.resolve(filePath);
    console.log('Absolute file path is -->', resolvedPath);
    // Также эту задачу мог решить .normalize() Данный метод возвращает реальный путь основываясь на спецификаторах вроде ".", "..", "//"
}

// Чтение файлов .readFile() и .readFileSync(). Данные методы считывают содержимое файлов в память целиком, что может сказаться на производительности

function doReadFile() {
    const filePath = '../assets/text.txt';
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data.toString());
    });
}

// Запись файлов .writeFile() Для изменения стандартного поведения (перезапись содержимого) следует использовать флаги. Например fs.writeFile(filePath, content, {flag: 'a+'}, (err) => {})

function doWtriteFile() {
    const filePath = '../assets/text.txt';
    const content = 'extra data\n';
    const flag = { flag: 'a' };
    fs.writeFile(filePath, content, flag, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

// .appendFile() удобно использовать для присоединения данных к концу файла

function doAppendFile() {
    const filePath = '../assets/text.txt';
    const content = 'super extra data\n';
    fs.appendFile(filePath, content, err => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

// Если данные нужно читать или писать порциями, то следует использовать потоки
// Проверка доступа к директории .access()
// Проверка существования папки .exist() и .existSync()
// Создание директории .mkdir() и .mkdirSync()
// Чтение содержимого папки .readdir() и .readdirSync()

function doThingsWithDirectory() {
    const path = require('path');
    const folderName = '../assets/extend';
    const pathToAssets = '../assets'
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        console.log(fs.existsSync(pathToAssets));
        if (fs.existsSync(pathToAssets)) {
            console.log(fs.readdirSync(pathToAssets));
            // Отфильтровать файлы можно так:
            const isFile = (file) => fs.statSync(file).isFile();
            const filesArray = fs.readdirSync(pathToAssets).map(fileName => path.join(pathToAssets, fileName)).filter(isFile);
            console.log(filesArray);
        }
    } catch (err) {
        console.error(err);
    }
}

// Переименовать папку можно методом .rename() или .renameSync() . Первый параметр - старый путь к папке, второй - новый путь к папке

function doRenameFolder() {
    const oldPath = '../assets/extend';
    const newPath = '../assets/test'
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        fs.readdir('../assets', (err, files) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(files);
        });
    });
}

// Удалить папку можно методом .rmdir() или .rmdirSync() . Для удаления не пустой папки лучше воспользоваться пакетом fs-extra и его методом .remove()

function removeNotEmptyFolder() {
    const fs =  require('fs-extra');
    const inquirer = require('inquirer');
    
    const folder = '../assets/not_empty';
    const params = [{
        type: 'input',
        name: 'number',
        message: 'Enter number from 0 to 2.\n 0 - processing in callback\n 1 - processing in promise\n 2 - processing in async/await\n'
    }];

    inquirer.prompt(params).then(result => {
        console.log(result);
        const key = +result['number'];
        console.log(typeof key);
        if (key === 0) {
            fs.remove(folder, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        } else if (key === 1) {
            fs.remove(folder).then(err => {
                if (err) {
                    console.error(err);
                    return;
                }
            })
        } else if (key === 2) {
            async function removeFolder(folder) {
                try {
                    await fs.remove(folder);
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            console.warn('Wrong parameter');
        }
    })    
}

// Саммари по методам модуля fs:
//  - .access() - проверяет наличие файла и доступа к нему с учетом разрешений
//  - .appendFile() - присоединяет данные к файлу. Создает файл при необходимости
//  - .chmod() - изменяет разрешения для файла (также есть .lchmod() и .fchmod())
//  - .chown() - изменяет владельца или группу для файла (.fchown(), .lchown())
//  - .close() - закрывает дескриптор файла
//  - .copyFile() - копирует файл
//  - .createReadStream() - создает поток для чтения
//  - .createWriteStream() - создает поток для записи
//  - .link() - создает новую жесткую ссылку на файл
//  - .mkdir() - создает директорию
//  - .mkdtemp() - создает временную папку
//  - .open() - открывает файл
//  - .readdir() - читает директорию
//  - .readFile() - читает файл
//  - .readlink() - считывает значение символической ссылки
//  - .realpath() - разрешает относительный путь к файлу построенный с использованием символов . и .. в полный путь
//  - .rename() - переименовывает файл или папку
//  - .rmdir() - удаляет пустую папку
//  - .stat() - возвращает сведения о файле
//  - .symlink() - создает новую символическую ссылку на файл
//  - .truncate() - обрезает файл до заданной длины
//  - .unlink() - удаляет файл или символическую ссылку
//  - .unwatchFile() - отключает наблюдение за изменениями файла
//  - .utimes() - изменяет временную отметку файла
//  - .watchFile() - включает наблюдение за изменениями в файле. (.watch())
//  - .writeFile() - записывает данные в файл

// Модуль path. Краткая справка и методы.
// .sep - содержит разделитель сегментов пути \ для Windows и / для Linux и MacOS
// .delimiter - разделитель для нескольких путей - ; для Windows и : для Linux и MacOS
// .basename() - возвращает последний фрагмент пути
// .dirname() - возвращает имя директории
// .extname() - возвращает расширение файла
// .isAbsolute() - возвращает истинное значение если путь абсолютный
// .join() - соединяет несколько частей пути
// .normalize() - выясняет реальный путь на основе пути содержащего символы ., .. и //
// .parse() - возвращает объект, содержащий отдельные части пути
// .relative() - принимает 2 пути и возвращает относительный путь из первого пути ко второму, основываясь на текущей директории
// .resolve() - находит абсолютный путь на основе относительного

const startDemo = function (index) {
    switch (index) {
        case '1':
            doFsOpen();
            break;
        case '2':
            getFileStats();
            break;
        case '3':
            getPathAndDoThings();
            break;
        case '4':
            doReadFile();
            break;
        case '5':
            doWtriteFile()
            break;
        case '6':
            doAppendFile();
            break;
        case '7':
            doThingsWithDirectory();
            break;
        case '8':
            doRenameFolder();
            break;
        case '9':
            removeNotEmptyFolder();
            break;
        default:
            console.log('No such index!');
            break;
    }
}(args);