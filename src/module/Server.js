const net = require('net');
const checker = require('./checker');
const command = require('./command');
const Error = require('./Error');
const commandParser = require('./commandParser');
const expirationService = require('./expirationService');

/**
 * Class for create a TCP server.
 * @class
 */
class Server {
  /**
   * @constructor
   * @param {Config} config Model with the configuration.
   */
  constructor (config) {
    console.log('starting...');

    this.server = net.createServer(this.listener.bind(this));

    this.server.on('error', (err) => {
      throw err;
    });

    this.server.listen(config.port, () => {
      expirationService(command._storage);

      console.log('opened server on', this.server.address());
    });
  }

  /**
   * Attach a handler to one or more clients for all connections.
   * @param {Socket} client An abstraction of a TCP socket endpoint.
   */
  listener (client) {
    const forWait = { cmd: '', args: [] };
    const cleanForWait = () => {
      forWait.cmd = '';
      forWait.args = [];
    };

    client.on('data', (data) => {
      const request = data.toString();
      const args = commandParser(request);
      const cmd = forWait.cmd || args[0];

      try {
        if (command._allCommands.includes(cmd) === false) {
          throw new Error.Default();
        }

        if (command._forWait.includes(cmd) && forWait.cmd === '' && request.match(/\r\n/g).length === 1) {
          checker.args[cmd](args);
          checker.setterArgs(args);

          forWait.cmd = cmd;
          forWait.args = args;
        } else {
          const argsMerge = [...forWait.args, ...args];
          checker.args[cmd || 'get'](argsMerge);
          command[cmd](client, argsMerge);

          cleanForWait();
        }
      } catch (err) {
        const noreply = checker.toReply(args, 5) || checker.toReply(args, 6);

        if (err instanceof Error.Client ||
          err instanceof Error.Default ||
          err instanceof Error.Server) {
          command.write(client, err.message, noreply);
          console.error(`${err.name}: ${err.message}`);
        } else {
          console.error(`UnexpectedError: ${err.message}`);
        }

        cleanForWait();
      }
    });
  }
}

module.exports = Server;
