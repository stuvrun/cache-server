const program = require('commander');
const message = require('./message');
const Config = require('../model/Config');

const config = new Config();

/**
 * Class for arguments parser elements.
 * @class
 */
class ArgumentParser {
  constructor () {
    program.version(config.version);

    program.option('-p, --port <number>', message.portDescription, '11211');

    program.parse(process.argv);
  }

  /**
   * Return a config model object.
   * @returns {Config} Config model.
   */
  getConfig () {
    if (program.port) config.port = Number.parseInt(program.port);

    return config;
  }
}

module.exports = ArgumentParser;
