/**
 * @author Hana Lee
 * @since 2016-04-11 21:54
 */
angular.module('PIGDATA.main-controller', ['ionic-datepicker', 'ngCordova'])
  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      /**
       * @type {Date}
       * @optional
       * @default new Date()
       */
      inputDate : new Date(),
      /**
       * @type {String}
       * @optional
       * @default Set
       */
      setLabel : 'Set',
      /**
       * @type {String}
       * @optional
       * @default Today
       */
      todayLabel : 'Today',
      /**
       * @type {String}
       * @optional
       * @default Close
       */
      closeLabel : 'Close', // optional - default 'Close'
      /**
       * @type {Boolean}
       * @optional
       * @default false
       */
      mondayFirst : false,
      /**
       * @type {String[]}
       * @optional
       * @default ["S", "M", "T", "W", "T", "F", "S"]
       */
      weeksList : ["S", "M", "T", "W", "T", "F", "S"],
      /**
       * @type {String[]}
       * @optional
       * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
       */
      monthsList : ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      /**
       * @type {Date[]}
       * @optional
       * @default []
       */
      disabledDates : [],
      /**
       * @type {String}
       * @optional
       * @default modal
       * @example
       * popup or modal
       */
      templateType : 'popup',
      /**
       * @type {Date}
       * @optional
       * @default new Date()
       */
      from : new Date(2012, 8, 1),
      /**
       * @type {Date}
       * @optional
       * @default new Date()
       */
      to : new Date(),
      /**
       * @type {Boolean}
       * @optional
       * @default true
       */
      showTodayButton : true,
      /**
       * @type {String}
       * @optional
       * @default dd-MM-yyyy
       */
      dateFormat : 'yyyy-MM-dd',
      /**
       * If set to true, Set button will be hidden
       *
       * @type {Boolean}
       * @optional
       * @default false
       */
      closeOnSelect : false,
      /**
       * @type {Number[]}
       * @optional
       * @default []
       * @example
       * [0] sunday disable
       * [0,1] sunday and monday disable
       */
      disableWeekdays : []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

  .controller('MainCtrl', function ($scope, Items, ionicDatePicker, $ionicPopup, $cordovaSQLite) {
    $scope.selectedTimestamp = new Date();

    $scope.items = Items.all();
    $scope.update = function (item) {
      Items.update(item);
    };
    $scope.delete = function (item) {
      Items.delete(item);
    };
    $scope.create = function (item) {
      Items.create(item);
    };
    $scope.plus = function () {
      if ($cordovaSQLite) {
        $cordovaSQLite.openDB({name : 'pigdata.db'}, function (db) {
          alert('test2');
          db.executeSql('INSERT INTO test (name) VALUES (?)', 'hana');
        });
      }
    };
    $scope.minus = function () {

    };
    $scope.showDatePicker = function () {
      var showAlert = function (message) {
        $ionicPopup.alert({
          title : '경고',
          template : message
        });
      };
      ionicDatePicker.openDatePicker({
        callback : function (value) {
          if (value > new Date().getTime()) {
            showAlert('오늘 이후의 날짜는 선택 안됩니다');
          } else {
            $scope.selectedTimestamp = value;
          }
          console.log('Return value from the datepicker popup is : ' + value, new Date(value));
        }
      });
    };
  });
