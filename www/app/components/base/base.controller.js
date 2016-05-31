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
   * @param {Object} $scope
   * @param {Object} $ionicSideMenuDelegate
   * @param {ItemService} ItemService
   */
  constructor($scope, $ionicSideMenuDelegate, ItemService) {
    this.items = [];
    this.firstItem = null;
    this.ItemService = ItemService;

    $scope.$watch(() => {
      return $ionicSideMenuDelegate.isOpenLeft();
    }, (isOpen) => this._onSideMenuOpen(isOpen));

    this._init();
  }

  _init() {
    this._itemsInitialize();
  }

  _itemsInitialize() {
    this.ItemService.getAllItem(new Date())
      .then((result) => {
        this.items = result;
        if (this.items.length > 0) {
          this.firstItem = this.items[0];
        }
      }, (err) => console.error(err));
  }

  _onSideMenuOpen(isOpen) {
    if (isOpen) {
      this._itemsInitialize();
    }
  }
}

export default ['$scope', '$ionicSideMenuDelegate', 'ItemService', BaseController];
