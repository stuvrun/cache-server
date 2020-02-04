const DataStorage = require('./DataStorage');
const worker = require('./expirationWorker');

/**
 * Function for expiration service.
 * @function
 */
function expirationService (dataStorage = new DataStorage()) {
  worker(dataStorage)
    .then(key => { if (key) dataStorage.delete(key); })
    .finally(() => {
      setTimeout(() => {
        expirationService(dataStorage);
      }, 1000);
    });
}

module.exports = expirationService;
