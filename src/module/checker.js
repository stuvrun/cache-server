const { CustomError } = require('./message')

/**
 * Class singleton for checker.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
const checker = {
  toReply: (args, index) => args[index] === 'noreply',
  dataBinary: (record) => {
    const DATA_ARRAY = new TextEncoder().encode(record.data)
    if (DATA_ARRAY.length !== record.bytes) {
      throw new Error(CustomError.client('bad data chunk') + CustomError.default())
    }

    return DATA_ARRAY.length
  },
  setterArgs: (args) => {
    const params = args[2] + args[3] + args[4] + (args[0] === ' cas' ? args[5] : 0)

    if (!Number.isInteger(Number(params))) {
      throw new Error(CustomError.client('bad command line format'))
    }
  },
  args: {
    get: (args = []) => {
      if (args.length !== 2) {
        throw new Error(CustomError.default())
      }
    },
    gets: (args = []) => {
      checker.args.get(args)
    },
    set: (args = [], min = 5, max = 7) => {
      if (!(args.length >= min && args.length <= max)) {
        throw new Error(CustomError.default())
      }
    },
    add: (args) => {
      checker.args.set(args)
    },
    replace: (args) => {
      checker.args.set(args)
    },
    append: (args) => {
      checker.args.set(args)
    },
    prepend: (args) => {
      checker.args.set(args)
    },
    cas: (args) => {
      checker.args.set(args, 6, 8)
    }
  }
}

module.exports = checker
