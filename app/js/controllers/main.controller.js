/**
 * @author Hana Lee
 * @since 2016-04-11 21:54
 */

export class MainController {
  constructor($scope, Items, ionicDatePicker, $ionicPopup) {
    this.$inject = [
      '$scope', 'Items', 'ionicDatePicker', '$ionicPopup'
    ];

    this.itemSvc = Items;
    this.ionicPopup = $ionicPopup;
    this.ionicDatePicker = ionicDatePicker;

    this.selectedTimestamp = new Date();
    this.items = this.itemSvc.all();
    this.scope = $scope;
    $scope.items = this.items;
    console.info(this.items);
    $scope.plus = this.plus;
    $scope.showDatePicker = this.showDatePicker;
  }

  update(item) {
    this.itemSvc.update(item);
  }

  delete(item) {
    this.itemSvc.delete(item);
  }

  create(item) {
    this.itemSvc.create(item);
  }

  plus() {
    console.info('on click plus button');
  }

  minus() {
    console.info('on click minus button');
  }

  showDatePicker() {
    console.info('show date picker');
    this.ionicDatePicker.openDatePicker({
      callback : this._datePickerCallback
    });
  }

  _showAlert(message) {
    this.ionicPopup.alert({
      title : '경고',
      template : message
    });
  }

  _datePickerCallback(value) {
    if (value > new Date().getTime()) {
      this._showAlert('오늘 이후의 날짜는 선택 안됩니다');
    } else {
      this.selectedTimestamp = value;
    }
    console.log('Return value from the datepicker popup is : ' + value, new Date(value));
  }
}
