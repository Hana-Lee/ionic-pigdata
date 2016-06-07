/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/**
 * @class DetailsController
 * @prop {DetailsFactory} factory
 * @prop {ItemService} ItemService
 * @prop {Item[]} items
 * @prop {String} viewType
 * @prop {Object} chart
 * @prop {Item} selectedItem
 * @prop {String} selectedDateString
 * @prop {Function} $moment
 * @prop {Object} $stateParams
 */
class DetailsController {

  /**
   * @constructor
   * @param {DetailsFactory} factory
   * @param {ItemService} ItemService
   * @param {Function} $moment
   * @param {Object} $stateParams
   * @param {Object} DatePickerService
   * @param {Object} pdLog
   */
  constructor(factory, ItemService, $moment, $stateParams, DatePickerService, pdLog) {
    this.factory = factory;
    this.ItemService = ItemService;
    this.$stateParams = $stateParams;
    this.selectedItemId = $stateParams.selectedItemId;
    this.DatePickerService = DatePickerService;
    this.viewType = 'week';
    this.chart = {};
    this.selectedItem = null;
    this.$moment = $moment;
    this.selectedMoment = this.$moment();
    this.selectedDateString = `${this.selectedMoment.week() - 1}주차`;
    this.pdLog = pdLog;

    this._init();
  }

  _init() {
    this.ItemService.getItem(this.selectedItemId, new Date()).then((result) => {
      this.selectedItem = result;
      this.factory.createChartStructure(this.selectedItem, this.viewType, this.selectedMoment.toDate())
        .then((result) => this.chart = result, (err) => console.error(err));
    }, (err) => console.error('get all item error : ', err));
  }

  onChangeViewType() {
    if (this.viewType === 'week') {
      this.selectedDateString = `${this.selectedMoment.week() - 1}주차`;
    } else if (this.viewType === 'month') {
      this.selectedDateString = `${this.selectedMoment.month() + 1}월`;
    } else if (this.viewType === 'year') {
      this.selectedDateString = `${this.selectedMoment.year()}년`;
    }
    this.factory.createChartStructure(this.selectedItem, this.viewType, this.selectedMoment.toDate())
      .then((result) => this.chart = result, (err) => console.error(err));
  }

  showDatePicker() {
    this.DatePickerService.showDatePicker({
      inputDate : this.selectedMoment.toDate()
    }, (value) => this._datePickerCallback(value));
  }

  _datePickerCallback(value) {
    this.pdLog.debug('date picker callback : ', value);
    this.selectedMoment = this.$moment(new Date(value));
    this.onChangeViewType();
  }
}

export default [
  'details.factory', 'ItemService', '$moment', '$stateParams', 'DatePickerService', 'pdLog',
  DetailsController
];
