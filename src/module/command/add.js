const abstract = require('./abstract');
const set = require('./set');
const message = require('../message');
const Response = require('../Response');
const validation = require('../validation');
const Request = require('../../model/Request');

/**
 * Class for 'add' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  _numberOfLinesToWait: 2,

  parser: (params, prevRequest, dataString = '') => {
    const request = prevRequest || new Request();

    request.cmd = 'add';
    request.params[request.lineCount] = request.lineCount === 1 ? dataString.replace(message.newLine, '') : params;
    request.lineCount += 1;
    request.waiting = request.lineCount < command._numberOfLinesToWait;
    request.noreply = validation.checkNotReply(request.params[0], 5);
    request.error = command.validate(request.params, request.waiting);

    return request;
  },

  run: (request = new Request()) => {
    const key = request.params[0][1];
    const element = command._storage.get(key);
    let response;

    if (element) {
      response = new Response();
      response.append(message.reply.notStored);
    } else {
      set._storage = command._storage;
      response = set.run(request);
    }

    return response.toString();
  },

  validate: (params, waiting) => {
    return validation.checkArrayLength(params[0], 5, 6) ||
      validation.checkNumericParams(params[0]) ||
      validation.checkBinaryLength(waiting, Number(params[0][4]), params[1] || '');
  }
};

module.exports = command;
