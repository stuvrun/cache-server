/**
 * Class singleton for common messages.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
module.exports = {
  Error: {
    client: (message = '') => `CLIENT_ERROR ${message}\r\n`,
    default: () => 'ERROR\r\n',
    server: (message = '') => `SERVER_ERROR ${message}\r\n`
  },
  Response: class {
    constructor () {
      this.data = []
    }

    append (text) {
      this.data.push(text)
    }

    toString () {
      return this.data.join('')
    }
  }
}
