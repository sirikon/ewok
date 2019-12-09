const fs = require('fs');

function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            if (err) { return reject(err); }
            resolve(data);
        });
    });
}

function checkFileOrDirectoryExists(path) {
    return new Promise((resolve) => {
        fs.exists(path, (exists) => {
            resolve(exists);
        });
    });
}

module.exports = {
    readFileContent,
    checkFileOrDirectoryExists
}
