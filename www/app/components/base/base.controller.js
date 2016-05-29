/**
 * @author Hana Lee
 * @since 2016-05-30 08:00
 */

/**
 * @class BaseController
 * @prop {Item[]} items
 * @prop {Item} firstItem
 * @prop {ItemService} ItemService
 */
class BaseController {

  /**
   * @constructor
   * @param {ItemService} ItemService
   */
  constructor(ItemService) {
    this.items = [];
    this.firstItem = null;
    this.ItemService = ItemService;

    this._init();
  }

  _init() {
    this.ItemService.getAllItem(new Date())
      .then((result) => {
        this.items = result;
        if (this.items.length > 0) {
          this.firstItem = this.items[0];
        }
      }, (err) => console.error(err));
  }
}

export default ['ItemService', BaseController];
