/**
 * @author Hana Lee
 * @since 2016-05-16 16:24
 */

/**
 * @class HomeController
 * @prop {Array} items
 * @prop {Date} selectedTimestamp
 * @prop {Function} ionicDatePicker
 */
class HomeController {

  constructor(factory, ionicDatePicker) {
    this.items = factory.all();
    this.selectedTimestamp = new Date();
    this.ionicDatePicker = ionicDatePicker;
    this.init();
  }

  init() {
    //code
  }

  showDatePicker() {
    console.info('show date picker');
    this.ionicDatePicker.openDatePicker({
      callback : (value) => this._datePickerCallback(value)
    });
  }

  _datePickerCallback(value) {
    this.selectedTimestamp = value;
  }

  plus() {
    console.info('on click plus(+) button');
  }

  minus() {
    console.info('on click minus(-) button');
  }
}

export default ['home.factory', 'ionicDatePicker', '$ionicPopup', HomeController];
