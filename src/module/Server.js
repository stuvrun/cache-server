const net = require('net')
const checker = require('./checker')
const command = require('./command')
const commandParser = require('./commandParser')

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

    const forWait = { cmd: '', args: [] }

    client.on('data', (data) => {
      const request = data.toString()
      const args = commandParser(request)
      const cmd = forWait.cmd || args[0]

      console.log(`** command: ${cmd}\r\n${data}**`)

      try {
        if (command._forWait.includes(cmd) && forWait.cmd === '') {
          checker.setterArgs(args)

          forWait.cmd = cmd
          forWait.args = args
        } else {
          command[cmd](client, [...forWait.args, ...args])

          forWait.cmd = ''
          forWait.args = []
        }
      } catch (err) {
        command.write(client, err.message)
        console.log('ERROR: ' + err.message)
      }
    })
  }
}

module.exports = Server
