const DataStorage = require('./DataStorage');
const add = require('./command/add');
const append = require('./command/append');
const cas = require('./command/cas');
const deleteCmd = require('./command/delete');
const get = require('./command/get');
const gets = require('./command/gets');
const prepend = require('./command/prepend');
const quit = require('./command/quit');
const replace = require('./command/replace');
const set = require('./command/set');
const invalid = require('./command/invalid');

/**
 * Class singleton factory for commands.
 * @class
 */
const commandFactory = {
  _counter: 1,
  _storage: new DataStorage(),

  getByKey (key = '') {
    let command;

    switch (key.trim()) {
      case 'add':
        command = add;
        command._storage = commandFactory._storage;
        break;
      case 'append':
        command = append;
        command._storage = commandFactory._storage;
        break;
      case 'cas':
        command = cas;
        command._storage = commandFactory._storage;
        break;
      case 'delete':
        command = deleteCmd;
        command._storage = commandFactory._storage;
        break;
      case 'get':
        command = get;
        command._storage = commandFactory._storage;
        break;
      case 'gets':
        command = gets;
        command._storage = commandFactory._storage;
        break;
      case 'prepend':
        command = prepend;
        command._storage = commandFactory._storage;
        break;
      case 'quit':
        command = quit;
        break;
      case 'replace':
        command = replace;
        command._storage = commandFactory._storage;
        break;
      case 'set':
        command = set;
        command._storage = commandFactory._storage;
        break;
      default:
        command = invalid;
        break;
    }

    return command;
  }
};

module.exports = commandFactory;
