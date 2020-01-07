const program = require('commander')
const Config = require('../model/Config')

/**
 * Class for arguments parser elements.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class ArgumentParser {
  constructor () {
    program.version('1.0.0')

    program.option('-p, --port <number>', 'port number where it will listen for TCP connections', '11211')

    program.parse(process.argv)
  }

  /**
   * Return a config model object.
   * @returns {Config} Config model.
   */
  getConfig () {
    const config = new Config()

    if (program.port) config.port = Number.parseInt(program.port)

    return config
  }
}

module.exports = ArgumentParser
