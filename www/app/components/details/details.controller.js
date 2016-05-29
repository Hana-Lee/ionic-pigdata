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
 */
class DetailsController {

  /**
   * @constructor
   * @param {DetailsFactory} factory
   * @param {ItemService} ItemService
   * @param {Function} $moment
   */
  constructor(factory, ItemService, $moment) {
    this.factory = factory;
    this.ItemService = ItemService;
    this.items = [];
    this.viewType = 'week';
    this.chart = {};
    this.selectedItem = null;
    this.$moment = $moment;
    this.selectedDateString = `${this.$moment().week() - 1}주차`;

    this._init();
  }

  _init() {
    console.info('details controller initialize');
    this.ItemService.getAllItem(new Date()).then((result) => {
      this.items = result;
      this.selectedItem = this.items[0];
      this.factory.createChartStructure(this.items[0], this.viewType)
        .then((result) => this.chart = result, (err) => console.error(err));
    }, (err) => console.error('get all item error : ', err));
  }

  onChangeViewType() {
    console.info('on change view type : ', this.viewType);
    if (this.viewType === 'week') {
      this.selectedDateString = `${this.$moment().week() - 1}주차`;
    } else if (this.viewType === 'month') {
      this.selectedDateString = `${new Date().getMonth() + 1}월`;
    } else if (this.viewType === 'year') {
      this.selectedDateString = `${new Date().getFullYear()}년`;
    }
    this.factory.createChartStructure(this.items[0], this.viewType)
      .then((result) => this.chart = result, (err) => console.error(err));
  }
}

export default ['details.factory', 'ItemService', '$moment', DetailsController];
