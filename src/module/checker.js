const Error = require('./Error');
const message = require('./message');

/**
 * Class singleton for checker.
 * @class
 */
const checker = {
  toReply: (args, index) => args[index] === 'noreply',
  dataBinary: (record) => {
    const dataArray = new TextEncoder().encode(record.data);
    if (dataArray.length !== record.bytes) {
      throw new Error.Client(message.validation.badDataChunk);
    }

    return dataArray.length;
  },
  setterArgs: (args) => {
    const params = args[2] + args[3] + args[4] + (args[0] === ' cas' ? args[5] : 0);

    if (!Number.isInteger(Number(params))) {
      throw new Error.Client(message.validation.badCommandLineFormat);
    }
  },
  args: {
    _base: (args = [], min = 5, max = 7) => {
      if (!(args.length >= min && args.length <= max)) {
        throw new Error.Default();
      }
    },
    get: (args = []) => {
      checker.args._base(args, 2, 2);
    },
    gets: (args = []) => {
      checker.args._base(args, 2, 2);
    },
    set: (args) => {
      checker.args._base(args);
    },
    add: (args) => {
      checker.args._base(args);
    },
    replace: (args) => {
      checker.args._base(args);
    },
    append: (args) => {
      checker.args._base(args);
    },
    prepend: (args) => {
      checker.args._base(args);
    },
    cas: (args) => {
      checker.args._base(args, 6, 8);
    },
    delete: (args) => {
      checker.args._base(args, 2, 3);
    },
    quit: (args) => {
      checker.args._base(args, 1, 1);
    }
  }
};

module.exports = checker;
