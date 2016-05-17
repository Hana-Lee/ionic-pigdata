/**
 * @author Hana Lee
 * @since 2016-05-14 22:14
 */

let router = function ($urlRouterProvider, $ionicConfigProvider, $compileProvider,
                       ionicDatePickerProvider) {
  _configRouter();
  _configWhiteList();
  _configDefault();
  _configDatePicker();

  function _configRouter() {
    $urlRouterProvider.otherwise('/base/home');
  }

  function _configWhiteList() {
    let imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//;
    let aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/;

    $compileProvider.imgSrcSanitizationWhitelist(imgSrcSanitizationWhitelist);
    $compileProvider.aHrefSanitizationWhitelist(aHrefSanitizationWhitelist);
  }

  function _configDefault() {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

    /**
     * @prop {Function} isIOS
     * @prop {Function} isWindowsPhone
     */
    let platform = ionic.Platform;
    if (platform.isIOS()) {
      $ionicConfigProvider.scrolling.jsScrolling(true);
    }
  }

  function _configDatePicker() {
    let datePickerObj = {
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
      setLabel : '선택',
      /**
       * @type {String}
       * @optional
       * @default Today
       */
      todayLabel : '오늘',
      /**
       * @type {String}
       * @optional
       * @default Close
       */
      closeLabel : '닫기', // optional - default 'Close'
      /**
       * @type {Boolean}
       * @optional
       * @default false
       */
      mondayFirst : false,
      /**
       * @type {String[]}
       * @optional
       * @default ['S', 'M', 'T', 'W', 'T', 'F', 'S']
       */
      weeksList : ['일', '월', '화', '수', '목', '금', '토'],
      /**
       * @type {String[]}
       * @optional
       * @default ['January', 'February', 'March', 'April', 'May', 'June', 'July',
       * 'August', 'September', 'October', 'November', 'December']
       */
      monthsList : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
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
  }
};

export default [
  '$urlRouterProvider', '$ionicConfigProvider', '$compileProvider',
  'ionicDatePickerProvider', router
];
