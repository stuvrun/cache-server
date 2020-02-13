const abstract = require('./abstract');
const message = require('../message');
const Response = require('../Response');
const validation = require('../validation');
const Request = require('../../model/Request');

/**
 * Class for 'get' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  _numberOfLinesToWait: 1,

  parser: (params, prevRequest) => {
    const request = prevRequest || new Request();

    request.cmd = 'get';
    request.params[request.lineCount] = params;
    request.lineCount += 1;
    request.waiting = request.lineCount < command._numberOfLinesToWait;
    request.noreply = false;
    request.error = command.validate(request.params[0]);

    return request;
  },

  run: (request = new Request()) => {
    const response = new Response();

    request.params[0].slice(1, request.params[0].length).forEach(key => {
      const element = command._storage.get(key);

      if (element) {
        response.append(`${message.reply.value} `);
        response.append(`${key} ${element.flags} ${element.bytes}`);
        response.append(message.reply.newLine);
        response.append(element.data);
        response.append(message.reply.newLine);
      }
    });

    response.append(message.reply.end);
    return response.toString();
  },

  validate: (params) => {
    return validation.checkArrayLength(params, 2, 2);
  }
};

module.exports = command;
