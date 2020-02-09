const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
const DataStorage = require('./DataStorage');
const Error = require('./Error');
const message = require('./message');

if (isMainThread) {
  module.exports = function runService (workerData = new DataStorage()) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error.Server(`${message.reply.workerStopped} ${code}`));
        }
      });
    }).then(key => { if (key) workerData.delete(key); })
      .finally(() => {
        setTimeout(() => {
          runService(workerData);
        }, 1000);
      });
  };
} else {
  const dataStorage = workerData;
  const table = dataStorage.table;
  let response = null;

  for (const key in table) {
    const record = table[key];
    const exptime = record.created + (record.exptime * 1000);

    if (Date.now() >= exptime) {
      response = key;
    }
  }

  parentPort.postMessage(response);
}
