const fs = require('fs');

function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            if (err) { return reject(err); }
            resolve(data);
        });
    });
}

module.exports = {
    readFileContent
}
