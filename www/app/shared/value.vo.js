/**
 * @author Hana Lee
 * @since 2016-06-03 17:39
 */

/**
 * @class Value
 * @prop {String} label
 * @prop {Object} value
 */
class Value {
  /**
   * @constructor
   * @param {String} label
   * @param {Object} value
   */
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

export default Value;
