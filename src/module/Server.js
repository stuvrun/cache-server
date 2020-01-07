const net = require('net')

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

    client.on('data', (dataOrigen) => {
      const data = dataOrigen.toString()

      console.log(`** command:\r\n${data}**`)

      if (data.startsWith('set')) {
        client.write('STORED\r\n')
      }

      if (data.startsWith('get')) {
        client.write('VALUE foo 0 3\r\nbar\r\nEND\r\n')
      }

      if (data.startsWith('quit')) {
        client.end()
      }
    })
  }
}

module.exports = Server
