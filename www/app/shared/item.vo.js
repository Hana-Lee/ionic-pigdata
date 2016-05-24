/**
 * @author Hana Lee
 * @since 2016-05-20 21:29
 */

/**
 * @class Item
 */
class Item {

  /** @constructor */
  constructor(id, valueId, seq, name, unit, value, valueTime) {
    /** @member {Number} */
    this.id = id;
    /** @member {Number} */
    this.valueId = valueId;
    /** @member {Number} */
    this.seq = seq;
    /** @member {String} */
    this.name = name;
    /** @member {Number} */
    this.unit = unit;
    /** @member {Number} */
    this.value = value;
    /** @member {Number} */
    this.valueTime = valueTime;
  }
}

export default Item;
