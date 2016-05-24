/**
 * @author Hana Lee
 * @since 2016-05-16 16:24
 */

import Item from '../../shared/item.vo';

/**
 * @class HomeController
 */
class HomeController {

  constructor(factory, ionicDatePicker, $ionicPopup) {
    this.factory = factory;
    this.items = [];
    this.selectedDate = new Date();
    this.ionicDatePicker = ionicDatePicker;
    this.$ionicPopup = $ionicPopup;
    this.init();
  }

  init() {
    this._getAllItem();
  }

  _getAllItem() {
    this.factory.getAllItem(this.selectedDate).then((items) => {
      console.info('items result : ', items);
      this.items = items;
    });
  }

  //noinspection JSMethodCanBeStatic
  showItemInfo(item) {
    console.info('show item info click', item);
    let today = new Date();
    if (this.selectedDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      this._showItemPopup('수정', item.name, item.unit, (name, unit) => {
        item.name = name;
        item.unit = unit;
        this.factory.updateItem(item).then((result) => {
          console.info('update item result : ', result);
        }, (err) => {
          console.error('update item error : ', err);
        });
      });
    } else {
      this.$ionicPopup.alert({
        title : '경고',
        template : '이전 날짜의 항목은 수정할 수 없습니다.'
      });
    }
  }

  /**
   * @memberof HomeController.addItem
   */
  addItem() {
    console.info('add item click');
    this._showItemPopup('항목 추가', null, 1, (name) => {
      let newItem = new Item();
      newItem.name = name;
      this.factory.createItem(newItem).then((result) => {
        console.info('create item result : ', result);
        this.items.push(result);
      });
    });
  }

  _showItemPopup(title, name, unit, callback) {
    let itemPopup = null;
    let options = {
      title : title || '항목 추가',
      template : '<div class="list">' +
      '<div class="item item-divider">' +
      '이름 입력' +
      '</div>' +
      '<div class="item item-input-inset"><label class="item-input-wrapper">' +
      '<input id="item-name" type="text" placeholder="이름을 입력해주세요" value="' + (name || '') + '"></label></div>' +
      '<div class="item item-divider">' +
      '단위 설정' +
      '</div>' +
      '<div class="item range range-balanced">' +
      '<label>1</label>' +
      '<input id="item-unit" type="range" name="volume" min="0" max="10" step="5" value="' + (unit || 1) + '">' +
      '<label>10</label>' +
      '</div>' +
      '</div>',
      inputPlaceholder : '이름을 입력하세요',
      scope : null, // Scope (optional). A scope to link to the popup content.
      buttons : [{ // Array[Object] (optional). Buttons to place in the popup footer.
        text : 'Cancel',
        type : 'button-assertive'
      }, {
        text : 'OK',
        type : 'button-positive',
        onTap : (e) => {
          e.preventDefault();
          let nameValue = document.querySelector('#item-name').value;
          let unitValue = document.querySelector('#item-unit').value;
          unitValue = unitValue === '0' ? '1' : unitValue;
          callback(nameValue, unitValue);
          itemPopup.close();
        }
      }]
    };

    itemPopup = this.$ionicPopup.show(options);
  }

  showDatePicker() {
    console.info('show date picker');
    this.ionicDatePicker.openDatePicker({
      inputDate : this.selectedDate,
      callback : (value) => this._datePickerCallback(value)
    });
  }

  _datePickerCallback(value) {
    console.info('date picker callback : ', value);
    this.selectedDate = new Date(value);
    this._getAllItem();
  }

  //noinspection JSMethodCanBeStatic
  deleteItem(item) {
    console.info('delete click', item);
    this.factory.deleteItem(item).then(() => {
      let itemIndex = this.items.findIndex(i => i.id === item.id);
      this.items.splice(itemIndex, 1);
      console.info('item index : ', itemIndex, this.items);
    }, err => console.error('delete item error : ', err));
  }

  //noinspection JSMethodCanBeStatic
  plus(item) {
    console.info('on click plus(+) button');
    item.value += Number(item.unit);
    this._updateItemValue(item);
  }

  //noinspection JSMethodCanBeStatic
  minus(item) {
    console.info('on click minus(-) button');
    item.value -= Number(item.unit);
    if (item.value < 0) {
      item.value = 0;
    }
    this._updateItemValue(item);
  }

  _updateItemValue(item) {
    console.info('_updateItemValue : ', item);
    if (item.valueId === null) {
      console.info('create item value');

      let today = new Date();
      let valueCreatedTime = new Date(this.selectedDate);
      item.valueTime = valueCreatedTime.setHours(today.getHours(), today.getMinutes(),
        today.getSeconds(), today.getMilliseconds());

      this.factory.createItemValue(item).then(result => {
        item.valueId = result.valueId;
      });
    } else {
      console.info('update item value');
      this.factory.updateItemValue(item);
    }
  }
}

export default ['home.factory', 'ionicDatePicker', '$ionicPopup', HomeController];
