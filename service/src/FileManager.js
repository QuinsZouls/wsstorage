const path = require('path');
const StorageManager = require('@slynova/flydrive');

const storage = new StorageManager({
  default: 'local',
  disks: {
    local: {
      driver: 'local',
      root: process.env.STORAGE_PATH || path.join(__dirname, '..', 'drive')
    }
  }
});

async function addFile(filePath, file) {
  await storage.put(filePath, file);
}
async function getFile(path) {
  if (await storage.exists(path)) {
    return await storage.get(path);
  }
  return false;
}
async function deletFile(filePath) {
  return await storage.delete(filePath);
}
async function existFile(filePath) {
  return await storage.exists(filePath);
}
module.exports = {
  addFile,
  getFile,
  deletFile,
  existFile
};
