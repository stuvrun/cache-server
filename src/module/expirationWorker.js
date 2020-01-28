const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads')
const DataStorage = require('./DataStorage')

if (isMainThread) {
  module.exports = function runService (workerData = new DataStorage()) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData })
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))
        }
      })
    })
  }
} else {
  const dataStorage = workerData || new DataStorage()
  const table = dataStorage.table
  let response = null

  for (const key in table) {
    const record = table[key]
    const exptime = record.created + (record.exptime * 1000)

    if (Date.now() >= exptime) {
      console.log(`Runnig expiration worker for key: ${key}`)
      response = key
    }
  }

  parentPort.postMessage(response)
}
