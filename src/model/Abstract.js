/**
 * Class for base models.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class Abstract {
  /**
   * Return a model value to a JSON string object.
   * @returns {string} JSON string representation of the model.
   */
  toString () {
    return JSON.stringify(this)
  }
}

module.exports = Abstract
