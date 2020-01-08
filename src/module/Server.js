const net = require('net')
const { Error, Response } = require('./message')

/**
 * Class for create a TCP server.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class Server {
  /**
   * @constructor
   * @param {Config} config Model with the configuration.
   */
  constructor (config) {
    console.log('starting...')

    this.server = net.createServer(this.listener.bind(this))

    this.server.on('error', (err) => {
      throw err
    })

    this.server.listen(config.port, () => {
      console.log('server bound')
      console.log('opened server on', this.server.address())
      console.log('started')
      console.log('--')
    })
  }

  /**
   * Attach a handler to one or more clients for all connections.
   * @param {Socket} client An abstraction of a TCP socket endpoint.
   */
  listener (client) {
    console.log('client connected')

    client.on('end', () => {
      console.log('client disconnected')
    })

    client.on('data', (data) => {
      const request = data.toString()
      const command = request.split(' ')[0].replace('\r\n', '')
      const response = new Response()

      console.log(`** command: ${command}\r\n${data}**`)

      switch (command) {
        case 'get':
          response.append('VALUE foo 0 3\r\n')
          response.append('bar\r\n')
          response.append('END\r\n')
          break
        case 'set':
          response.append('STORED\r\n')
          break
        case 'quit':
          client.end()
          break
        default:
          client.write(Error.default())
      }

      if (command !== 'quit') {
        client.write(response.toString())
      }
    })
  }
}

module.exports = Server
