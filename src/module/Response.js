/**
 * Class for response messages.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
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
