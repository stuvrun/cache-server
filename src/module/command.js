const DataStorage = require('./DataStorage');
const checker = require('./checker');
const message = require('./message');
const Response = require('./Response');
const Record = require('../model/Record');
const _forWait = ['set', 'add', 'replace', 'append', 'prepend', 'cas'];

/**
 * Class singleton for commands.
 * @class
 */
const command = {
  _counter: 1,
  _forWait,
  _allCommands: ['quit', 'get', 'gets', 'delete', ..._forWait],
  _storage: new DataStorage(),
  // get gets
  get: (client, args = [], withCAS = false) => {
    const response = new Response();

    args.slice(1, args.length).forEach(key => {
      const element = command._storage.get(key);

      if (element) {
        const CASComplement = withCAS ? ' ' + element.id : '';

        response.append(`${message.reply.value} `);
        response.append(`${key} ${element.flags} ${element.bytes}`);
        response.append(CASComplement);
        response.append(message.reply.newLine);
        response.append(element.data);
        response.append(message.reply.newLine);
      }
    });

    response.append(message.reply.end);
    command.write(client, response);
  },
  gets: (client, args = []) => {
    command.get(client, args, true);
  },
  quit: (client) => {
    client.end();
  },
  // set add replace append prepend cas
  set: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 5);
    const record = command.createRecord(args);

    command._storage.set(key, record);

    const response = new Response();
    response.append(message.reply.stored);
    command.write(client, response, noreply);
  },
  add: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 5);
    const element = command._storage.get(key);

    if (element) {
      const response = new Response();
      response.append(message.reply.notStored);
      command.write(client, response, noreply);
    } else {
      command.set(client, args);
    }
  },
  replace: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 5);
    const element = command._storage.get(key);

    if (element) {
      command.set(client, args);
    } else {
      const response = new Response();
      response.append(message.reply.notStored);
      command.write(client, response, noreply);
    }
  },
  append: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 5);
    const element = command._storage.get(key);

    if (element) {
      args[4] = element.bytes + command.createRecord(args).bytes;
      args[args.length - 1] = element.data + args[args.length - 1];
      command.set(client, args);
    } else {
      const response = new Response();
      response.append(message.reply.notStored);
      command.write(client, response, noreply);
    }
  },
  prepend: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 5);
    const element = command._storage.get(key);

    if (element) {
      args[4] = element.bytes + command.createRecord(args).bytes;
      args[args.length - 1] = args[args.length - 1] + element.data;
      command.set(client, args);
    } else {
      const response = new Response();
      response.append(message.reply.notStored);
      command.write(client, response, noreply);
    }
  },
  cas: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 6);
    const idCAS = Number(args[5]);
    const element = command._storage.get(key);

    if (element) {
      if (element.id === idCAS) {
        command.set(client, args);
      } else {
        const response = new Response();
        response.append(message.reply.exists);
        command.write(client, response, noreply);
      }
    } else {
      const response = new Response();
      response.append(message.reply.notFound);
      command.write(client, response, noreply);
    }
  },
  // delete
  delete: (client, args = []) => {
    const key = args[1];
    const noreply = checker.toReply(args, 2);
    const element = command._storage.get(key);
    const response = new Response();

    if (element) {
      command._storage.delete(key);
      response.append(message.reply.deleted);
    } else {
      response.append(message.reply.notFound);
    }

    command.write(client, response, noreply);
  },
  // generic
  createRecord: (args) => {
    const record = new Record();
    record.id = command._counter;
    record.flags = Number(args[2]);
    record.exptime = Number(args[3]);
    record.bytes = Number(args[4]);
    record.data = args[args.length - 1];

    record.bytes = checker.dataBinary(record);
    command._counter++;

    return record;
  },
  write: (client, response, noreply = false) => {
    if (noreply === false) {
      client.write(response.toString());
    }
  }
};

module.exports = command;
