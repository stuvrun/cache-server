/**
 * Class singleton for commons errors.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
module.exports = {
  client: (message = '') => `CLIENT_ERROR ${message}\r\n`,
  default: () => 'ERROR\r\n',
  server: (message = '') => `SERVER_ERROR ${message}\r\n`
};
