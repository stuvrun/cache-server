const { TextEncoder } = require('util');
const Error = require('./Error');
const message = require('./message');

/**
 * Class singleton for validation.
 * @class
 */
const validation = {
  checkBinaryLength: (waiting, bytes, data) => {
    let error;

    const dataArray = new TextEncoder().encode(data);
    if (dataArray.length !== bytes && !waiting) {
      error = new Error.Client(message.validation.badDataChunk);
    }

    return error;
  },
  checkArrayLength: (params = [], min = 5, max = 7) => {
    let error;

    if (!(params.length >= min && params.length <= max)) {
      error = new Error.Default();
    }

    return error;
  },
  checkNumericParams: (params) => {
    let error;

    if (isNaN(params[2]) ||
      isNaN(params[3]) ||
      isNaN(params[4]) ||
      (params[0].includes('cas') ? isNaN(params[5]) : false)) {
      error = new Error.Client(message.validation.badCommandLineFormat);
    }

    return error;
  },
  checkNotReply: (params, index) => params[index] === 'noreply'
};

module.exports = validation;
