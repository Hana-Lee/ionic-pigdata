/**
 * @author Hana Lee
 * @since 2016-06-04 02:37
 */

/**
 * @class DatePickerService
 * @prop {Object} ionicDatePicker
 */
class DatePickerService {
  /**
   * @constructor
   * @param {Object} ionicDatePicker
   */
  constructor(ionicDatePicker) {
    this.ionicDatePicker = ionicDatePicker;
  }

  /**
   * 날짜 선택 팝업을 띄워주고 날짜를 선택하면 선택된 값을
   * callback 함수에 전달하여 실행한다
   *
   * @param {Object} options
   * @param {Function} callback
   */
  showDatePicker(options, callback) {
    this.ionicDatePicker.openDatePicker({
      inputDate : options.inputDate || new Date(),
      callback : (value) => callback(value)
    });
  }
}

export default ['ionicDatePicker', DatePickerService];
