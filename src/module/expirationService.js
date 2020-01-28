const DataStorage = require('./DataStorage')
const worker = require('./expirationWorker')

/**
 * Function for expiration service.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @param {DataStorage} dataStorage instance
 * @function
 */
function expirationService (dataStorage = new DataStorage()) {
  worker(dataStorage)
    .then(key => { if (key) dataStorage.delete(key) })
    .finally(() => { expirationService(dataStorage) })
}

module.exports = expirationService
