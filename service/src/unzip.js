const unzipper = require('unzipper');
const fs = require('fs');

function unzipFile(filePath, output) {
  return fs
    .createReadStream(filePath)
    .pipe(unzipper.Extract({ path: output }));
}
module.exports = unzipFile;