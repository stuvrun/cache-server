const abstract = require('./abstract');
const message = require('../message');
const Response = require('../Response');
const validation = require('../validation');
const Request = require('../../model/Request');

/**
 * Class for 'delete' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  parser: (params, prevRequest) => {
    const request = prevRequest || new Request();

    request.cmd = 'delete';
    request.params[request.lineCount] = params;
    request.lineCount += 1;
    request.waiting = request.lineCount < command._numberOfLinesToWait;
    request.noreply = validation.checkNotReply(request.params[0], 2);
    request.error = command.validate(request.params[0]);

    return request;
  },

  run: (request = new Request()) => {
    const key = request.params[0][1];
    const element = command._storage.get(key);
    const response = new Response();

    if (element) {
      command._storage.delete(key);
      response.append(message.reply.deleted);
    } else {
      response.append(message.reply.notFound);
    }

    return response.toString();
  },

  validate: (params) => {
    return validation.checkArrayLength(params, 2, 3);
  }
};

module.exports = command;
