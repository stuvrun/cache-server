const Abstract = require('./Abstract')

/**
 * Class for record (row) models.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @implements {Abstract}
 * @class
 */
class Record extends Abstract {
  /**
   * @constructor
   */
  constructor () {
    super()

    /** @type {number} */
    this.id = undefined

    /** @type {number} */
    this.flags = undefined

    /** @type {number} */
    this.bytes = undefined

    /** @type {string} */
    this.data = undefined

    /** @type {number} */
    this.created = Date.now()

    /** @type {number} */
    this.exptime = 0
  }
}

module.exports = Record
