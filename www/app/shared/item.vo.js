/**
 * @author Hana Lee
 * @since 2016-05-20 21:29
 */

/**
 * @class Item
 */
class Item {
  constructor(id, valueId, seq, name, unit, value) {
    this.id = id;
    this.valueId = valueId;
    this.seq = seq;
    this.name = name;
    this.unit = unit;
    this.value = value;
  }

  getId() {
    return this.id;
  }

  getValueId() {
    return this.valueId;
  }

  getSeq() {
    return this.seq;
  }

  getName() {
    return this.name;
  }

  getUnit() {
    return this.unit;
  }

  getValue() {
    return this.value;
  }
}

export default Item;
