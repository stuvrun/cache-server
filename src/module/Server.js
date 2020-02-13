const net = require('net');
const commandFactory = require('./commandFactory');
const Error = require('./Error');
const expirationWorker = require('./expirationWorker');
const paramsParser = require('./paramsParser');
const Request = require('../model/Request');

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
      expirationWorker(commandFactory._storage);

      console.log('opened server on', this.server.address());
    });
  }

  /**
   * Attach a handler to one or more clients for all connections.
   * @param {Socket} client An abstraction of a TCP socket endpoint.
   */
  listener (client) {
    let request = new Request();

    client.on('data', (dataRaw) => {
      const dataString = dataRaw.toString();
      const params = paramsParser(dataString);
      const command = commandFactory.getByKey(request.cmd || params[0]);
      let response = '';

      try {
        request = command.parser(params, request, dataString);
        response = this.commandService(command, request);
      } catch (err) {
        request.waiting = false;
        response = this.errorService(err);
      }

      this.sendResponse(client, request, response);
      request = this.keepRequest(request);
    });
  }

  commandService (command, request) {
    let response = '';

    if (request.error) {
      throw request.error;
    } else if (request.waiting === false) {
      response = command.run(request);
    }

    return response;
  }

  errorService (err) {
    let errorType = 'UnexpectedError';
    let response = '';

    if (err instanceof Error.Client ||
      err instanceof Error.Default ||
      err instanceof Error.Server) {
      errorType = err.name;
      response = err.message;
    }

    console.error(`${errorType}: ${err.message}`);
    return response;
  }

  keepRequest (request) {
    let result = request;

    if (request.error || request.waiting === false) {
      result = new Request();
    }

    return result;
  }

  sendResponse (client, request, response) {
    if (request.quitConnection) {
      client.end();
    } else if (request.noreply === false && request.waiting === false) {
      client.write(response);
    }
  }
}

module.exports = Server;
