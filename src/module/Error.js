/**
 * Class singleton for commons errors.
 * @class
 */
module.exports = {
  Base: Error,
  Client: class extends Error {
    constructor (message) {
      super(`CLIENT_ERROR ${message}\r\n`);
      this.name = 'ClientError';
    }
  },
  Default: class extends Error {
    constructor () {
      super('ERROR\r\n');
      this.name = 'DefaultError';
    }
  },
  Server: class extends Error {
    constructor (message) {
      super(`SERVER_ERROR ${message}\r\n`);
      this.name = 'ServerError';
    }
  }
};
