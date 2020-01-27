/**
 * Class for data storage on server as hash table.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class DataStorage {
  constructor () {
    this.table = {}
  }

  delete (key) {
    return delete this.table[key]
  }

  get (key) {
    return this.table[key]
  }

  set (key, data) {
    this.table[key] = data
  }
}

module.exports = DataStorage
