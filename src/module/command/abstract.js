const Error = require('../Error');
const Record = require('../../model/Record');

/**
 * Class base for commands.
 * @class
 */
const abstract = {
  /** @type {number} */
  _numberOfLinesToWait: 1,

  /** @type {DataStorage} */
  _storage: undefined,

  createRecord: (params) => {
    const record = new Record();
    record.flags = Number(params[0][2]);
    record.exptime = Number(params[0][3]);
    record.bytes = Number(params[0][4]);
    record.data = params[1];

    return record;
  },

  parser: (params) => {
    throw Error.Base('you need to define this function');
  },

  run: (request) => {
    throw Error.Base('you need to define this function');
  },

  validate: (params) => {
    throw Error.Base('you need to define this function');
  }
};

module.exports = abstract;
