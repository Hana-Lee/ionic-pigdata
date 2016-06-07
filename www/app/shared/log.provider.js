/**
 * @author Hana Lee
 * @since 2016-06-07 20:55
 */

/**
 * @class
 */
class Log {
  /**
   * @constructor
   */
  constructor() {
    this.enable = false;
  }

  setEnable(enable) {
    this.enable = enable;
  }

  debug(...args) {
    if (this.enable) {
      console.debug(...args);
    }
  }

  info(...args) {
    if (this.enable) {
      console.info(...args);
    }
  }

  log(...args) {
    if (this.enable) {
      console.log(...args);
    }
  }

  //noinspection JSMethodCanBeStatic
  $get() {
    return this;
  }
}

export default [Log];
