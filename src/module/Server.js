const net = require('net');
const command = require('./command');
const Error = require('./Error');
const commandParser = require('./commandParser');
const expirationWorker = require('./expirationWorker');
const validation = require('./validation');

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
      expirationWorker(command._storage);

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
      const lines = request.match(/\r\n/g) || [];
      const args = commandParser(request);
      const cmd = forWait.cmd || args[0];

      try {
        if (command._allCommands.includes(cmd) === false) {
          throw new Error.Default();
        }

        if (command._forWait.includes(cmd) && forWait.cmd === '' && lines.length === 1) {
          validation.checkArgumentsLength[cmd](args);
          validation.checkNumericArguments(args);

          forWait.cmd = cmd;
          forWait.args = args;
        } else {
          const argsMerge = [...forWait.args, ...args];
          validation.checkArgumentsLength[cmd || 'get'](argsMerge);
          command[cmd](client, argsMerge);

          cleanForWait();
        }
      } catch (err) {
        const noreply = validation.toReply(args, 5) || validation.toReply(args, 6);

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
