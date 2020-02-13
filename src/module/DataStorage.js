/**
 * Class for data storage on server as hash table.
 * @class
 */
class DataStorage {
  constructor () {
    this._counter = 1;
    this._table = {};
  }

  delete (key) {
    return delete this._table[key];
  }

  get (key) {
    return this._table[key];
  }

  set (key, data) {
    data.id = this._counter;
    this._table[key] = data;
    this._counter++;
  }
}

module.exports = DataStorage;
