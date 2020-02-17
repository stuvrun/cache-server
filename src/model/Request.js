const Abstract = require('./Abstract');
const message = require('../module/message');

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

  setParamsForStorage (params, dataString) {
    const lines = dataString.split(message.newLine);

    if (this.lineCount === 0 && lines.length === 3) {
      this.params[0] = lines[0].trim().split(' ');
      this.params[1] = lines[1];
      this.lineCount = 2;
    } else if (this.lineCount === 1) {
      this.params[this.lineCount] = dataString.replace(message.newLine, '');
      this.lineCount += 1;
    } else {
      this.params[this.lineCount] = params;
      this.lineCount += 1;
    }
  }
}

module.exports = Request;
