/**
 * Class for base models.
 * @class
 */
class Abstract {
  /**
   * Return a model value to a JSON string object.
   * @returns {string} JSON string representation of the model.
   */
  toString () {
    return JSON.stringify(this);
  }
}

module.exports = Abstract;
