const Error = require('./Error');
const message = require('./message');

/**
 * Class singleton for validation.
 * @class
 */
const validation = {
  checkArgumentsLength: {
    get: (args = []) => {
      validation.checkArrayLength(args, 2, 2);
    },
    gets: (args = []) => {
      validation.checkArrayLength(args, 2, 2);
    },
    set: (args) => {
      validation.checkArrayLength(args);
    },
    add: (args) => {
      validation.checkArrayLength(args);
    },
    replace: (args) => {
      validation.checkArrayLength(args);
    },
    append: (args) => {
      validation.checkArrayLength(args);
    },
    prepend: (args) => {
      validation.checkArrayLength(args);
    },
    cas: (args) => {
      validation.checkArrayLength(args, 6, 8);
    },
    delete: (args) => {
      validation.checkArrayLength(args, 2, 3);
    },
    quit: (args) => {
      validation.checkArrayLength(args, 1, 1);
    }
  },
  checkBinaryLength: (record) => {
    const dataArray = new TextEncoder().encode(record.data);
    if (dataArray.length !== record.bytes) {
      throw new Error.Client(message.validation.badDataChunk);
    }

    return dataArray.length;
  },
  checkArrayLength: (args = [], min = 5, max = 7) => {
    if (!(args.length >= min && args.length <= max)) {
      throw new Error.Default();
    }
  },
  checkNumericArguments: (args) => {
    const params = args[2] + args[3] + args[4] + (args[0] === ' cas' ? args[5] : 0);

    if (!Number.isInteger(Number(params))) {
      throw new Error.Client(message.validation.badCommandLineFormat);
    }
  },
  toReply: (args, index) => args[index] === 'noreply'
};

module.exports = validation;
