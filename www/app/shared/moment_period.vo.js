/**
 * @author Hana Lee
 * @since 2016-06-03 17:48
 */

/**
 * @class
 * @prop {Object} from - moment object
 * @prop {Object} to - moment object
 */
class MomentPeriod {
  /**
   * @constructor
   * @param {Object} from - moment object
   * @param {Object} to - moment object
   */
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

export default MomentPeriod;
