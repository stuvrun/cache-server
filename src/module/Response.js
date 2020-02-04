/**
 * Class for response messages.
 * @class
 */
class Response {
  constructor () {
    this.data = [];
  }

  append (text) {
    this.data.push(text);
  }

  toString () {
    return this.data.join('');
  }
}

module.exports = Response;
