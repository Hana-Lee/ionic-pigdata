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
    this.factory = factory;
    this.items = [];
    this.selectedTimestamp = new Date();
    this.ionicDatePicker = ionicDatePicker;
    this.init();
  }

  init() {
    this.factory.getAllItem().then((items) => {
      console.info('items result : ', items);
      this.items = items;
    });
  }

  showItemInfo(item) {
    event.stopPropagation();
    console.info('show item info click', item);
  }

  addItem(event) {
    event.stopPropagation();
    console.info('add item click');
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

  plus(event) {
    event.stopPropagation();
    console.info('on click plus(+) button');
  }

  minus(event) {
    event.stopPropagation();
    console.info('on click minus(-) button');
  }
}

export default ['home.factory', 'ionicDatePicker', HomeController];
