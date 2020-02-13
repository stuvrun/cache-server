const abstract = require('./abstract');
const message = require('../message');
const Response = require('../Response');
const validation = require('../validation');
const Request = require('../../model/Request');

/**
 * Class for 'set' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  _counter: 1,
  _numberOfLinesToWait: 2,

  parser: (params, prevRequest, dataString) => {
    const request = prevRequest || new Request();

    request.cmd = 'set';
    request.params[request.lineCount] = request.lineCount === 1 ? dataString.replace(message.newLine, '') : params;
    request.lineCount += 1;
    request.waiting = request.lineCount < command._numberOfLinesToWait;
    request.noreply = validation.checkNotReply(request.params[0], 5);
    request.error = command.validate(request.params, request.waiting);

    return request;
  },

  run: (request = new Request()) => {
    const key = request.params[0][1];
    const record = command.createRecord(request.params);

    command._storage.set(key, record);

    const response = new Response();
    response.append(message.reply.stored);
    return response.toString();
  },

  validate: (params, waiting) => {
    return validation.checkArrayLength(params[0], 5, 6) ||
      validation.checkNumericParams(params[0]) ||
      validation.checkBinaryLength(waiting, Number(params[0][4]), params[1] || '');
  }
};

module.exports = command;
