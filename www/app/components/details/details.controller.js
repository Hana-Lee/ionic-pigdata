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
   * @param {Object} ionicDatePicker
   */
  constructor(factory, ItemService, $moment, $stateParams, ionicDatePicker) {
    this.factory = factory;
    this.ItemService = ItemService;
    this.$stateParams = $stateParams;
    this.selectedItemId = $stateParams.selectedItemId;
    this.ionicDatePicker = ionicDatePicker;
    this.viewType = 'week';
    this.chart = {};
    this.selectedItem = null;
    this.$moment = $moment;
    this.selectedMoment = this.$moment();
    this.selectedDateString = `${this.selectedMoment.week() - 1}주차`;

    console.info('state param : ', $stateParams, $stateParams.itemId);
    this._init();
  }

  _init() {
    console.info('details controller initialize');
    this.ItemService.getItem(this.selectedItemId, new Date()).then((result) => {
      this.selectedItem = result;
      this.factory.createChartStructure(this.selectedItem, this.viewType, this.selectedMoment.toDate())
        .then((result) => this.chart = result, (err) => console.error(err));
    }, (err) => console.error('get all item error : ', err));
  }

  onChangeViewType() {
    console.info('on change view type : ', this.viewType);
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
    console.info('show date picker');
    this.ionicDatePicker.openDatePicker({
      inputDate : this.selectedMoment.toDate(),
      callback : (value) => this._datePickerCallback(value)
    });
  }

  _datePickerCallback(value) {
    console.info('date picker callback : ', value);
    this.selectedMoment = this.$moment(new Date(value));
    this.onChangeViewType();
  }
}

export default [
  'details.factory', 'ItemService', '$moment', '$stateParams', 'ionicDatePicker',
  DetailsController
];
