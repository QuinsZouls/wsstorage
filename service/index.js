const WebSocket = require('ws');
const FileManager = require('./src/FileManager');
const path = require('path');
const unzip = require('./src/unzip');
const verifyClient = require('./src/Secure/verifyConnection');

const ws = new WebSocket.Server({
  port: process.env.PORT || 8026,
  verifyClient
});

async function waitSetFile(file) {
  await FileManager.addFile(file.path, Buffer.from(file.data));
}
async function waitGetFile(filePath, ws) {
  let file = await FileManager.getFile(filePath);
  if (!file) {
    ws.close(404);
  } else {
    ws.send(file, { binary: true });
  }
}
async function waitSetBizcard(value) {
  await FileManager.addFile(value.name + '.zip', Buffer.from(value.data));
  await unzip(
    path.join(__dirname, 'drive', value.name + '.zip'),
    path.join(__dirname, 'drive', value.name)
  );
  await FileManager.deletFile(value.name + '.zip');
}

ws.on('connection', (ws, req) => {
  ws.on('message', async message => {
    let { action, value } = JSON.parse(message);
    switch (action) {
      case 'set':
        await waitSetFile(value);
        ws.close();
        break;
      case 'set-bizcard':
        await waitSetBizcard(value);
        ws.close();
        break;
      case 'get':
        await waitGetFile(value, ws);
        ws.close();
        break;
      case 'exist':
        let response = await FileManager.existFile(value);
        ws.send(`${response}`);
        ws.close();
        break;
      default:
        ws.close(403);
        break;
    }
  });
});
