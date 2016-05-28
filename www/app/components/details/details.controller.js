/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/**
 * @class DetailsController
 * @prop {Object} factory
 * @prop {ItemService} ItemService
 * @prop {Item[]} items
 * @prop {String} viewType
 * @prop {Object} chart
 * @prop {Item} selectedItem
 */
class DetailsController {

  /**
   * @constructor
   * @param {Object} factory
   * @param {ItemService} ItemService
   */
  constructor(factory, ItemService) {
    this.factory = factory;
    this.ItemService = ItemService;
    this.items = [];
    this.viewType = 'week';
    this.chart = {};
    this.selectedItem = null;

    this._init();
  }

  _init() {
    this.ItemService.getAllItem(new Date()).then((result) => {
      this.items = result;
      this.selectedItem = this.items[0];
      this.factory.createChartStructure(this.items[0], this.viewType)
        .then((result) => this.chart = result, (err) => console.error(err));
    }, (err) => console.error('get all item error : ', err));
  }
}

export default ['details.factory', 'ItemService', DetailsController];
