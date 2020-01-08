const packageOrigen = require('../../package.json')
const Abstract = require('./Abstract')

/**
 * Class for base models.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @implements {Abstract}
 * @class
 */
class Config extends Abstract {
  /**
   * @constructor
   */
  constructor () {
    super()

    /** @type {number} */
    this.port = 11211

    /** @type {string} */
    this.version = packageOrigen.version
  }
}

module.exports = Config
