const program = require('commander')
const Config = require('../model/Config')

const config = new Config()

/**
 * Class for arguments parser elements.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class ArgumentParser {
  constructor () {
    program.version(config.version)

    program.option('-p, --port <number>', 'port number where it will listen for TCP connections', '11211')

    program.parse(process.argv)
  }

  /**
   * Return a config model object.
   * @returns {Config} Config model.
   */
  getConfig () {
    if (program.port) config.port = Number.parseInt(program.port)

    return config
  }
}

module.exports = ArgumentParser
