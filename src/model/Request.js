const Abstract = require('./Abstract');

/**
 * Class for record (row) models.
 * @implements {Abstract}
 * @class
 */
class Request extends Abstract {
  /**
   * @constructor
   */
  constructor () {
    super();

    /** @type {String} */
    this.cmd = undefined;

    /** @type {Number} */
    this.lineCount = 0;

    /** @type {Array} */
    this.params = [];

    /** @type {Boolean} */
    this.waiting = false;

    /** @type {Boolean} */
    this.noreply = false;

    /** @type {Boolean} */
    this.quitConnection = false;

    /** @type {Error} */
    this.error = undefined;
  }
}

module.exports = Request;
