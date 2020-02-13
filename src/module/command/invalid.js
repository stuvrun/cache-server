const abstract = require('./abstract');
const Error = require('../Error');
const Request = require('../../model/Request');

/**
 * Class for 'invalid' command.
 * @implements {Abstract}
 * @class
 */
const command = {
  ...abstract,

  parser: () => {
    const request = new Request();
    request.error = new Error.Default();

    return request;
  }
};

module.exports = command;
