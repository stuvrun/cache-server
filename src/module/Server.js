const net = require('net')
const checker = require('./checker')
const command = require('./command')
const { CustomError } = require('./message')
const commandParser = require('./commandParser')
const expirationService = require('./expirationService')

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
      expirationService(command._storage)

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
    const cleanForWait = () => {
      forWait.cmd = ''
      forWait.args = []
    }

    client.on('data', (data) => {
      const request = data.toString()
      const args = commandParser(request)
      const cmd = forWait.cmd || args[0]

      console.log(`** command: ${cmd}\r\n${data}**`)

      try {
        if (command._allCommands.includes(cmd) === false) {
          throw Error(CustomError.default())
        }

        if (command._forWait.includes(cmd) && forWait.cmd === '') {
          checker.args[cmd](args)
          checker.setterArgs(args)

          forWait.cmd = cmd
          forWait.args = args
        } else {
          const argsMerge = [...forWait.args, ...args]
          checker.args[cmd || 'get'](argsMerge)
          command[cmd](client, argsMerge)

          cleanForWait()
        }
      } catch (err) {
        const noreply = checker.toReply(args, 5) || checker.toReply(args, 6)

        command.write(client, err.message, noreply)
        console.log('ERROR: ' + err.message)

        cleanForWait()
      }
    })
  }
}

module.exports = Server
