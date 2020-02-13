const abstract = require('./abstract');
const validation = require('../validation');
const Request = require('../../model/Request');

/**
 * Class for 'quit' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  _numberOfLinesToWait: 1,

  parser: (params, prevRequest) => {
    const request = prevRequest || new Request();

    request.cmd = 'quit';
    request.params[request.lineCount] = params;
    request.lineCount += 1;
    request.waiting = request.lineCount < command._numberOfLinesToWait;
    request.noreply = false;
    request.quitConnection = true;
    request.error = command.validate(request.params[0]);

    return request;
  },

  run: () => {
    return 'quitted';
  },

  validate: (params) => {
    return validation.checkArrayLength(params, 1, 1);
  }
};

module.exports = command;
