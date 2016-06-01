/**
 * @author Hana Lee
 * @since 2016-05-16 18:11
 */

/**
 * @class SettingsController
 * @prop {Object} settings
 * @prop {Object} $ionicPopup
 */
class SettingsController {

  /**
   * @constructor
   * @param {Object} factory
   * @param {Object} $ionicPopup
   */
  constructor(factory, $ionicPopup) {
    this.settings = factory.getSettings();
    this.$ionicPopup = $ionicPopup;
  }

  init() {
  }

  showAppInfo() {
    let options = {
      title : '앱 정보',
      scope : null,
      template : '<div class="row">' +
      '<div class="col">앱이름</div><div class="col">PIGDATA</div>' +
      '</div>' +
      '<div class=" row">' +
      '<div class="col">개발자</div><div class="col">Hana Lee</div>' +
      '</div>' +
      '<div class=" row">' +
      '<div class="col">버전</div><div class="col">v0.1.0</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">릴리즈</div><div class="col">2016-06-01</div>' +
      '</div>',
      buttons : [{
        text : '닫기',
        type : 'button-positive'
      }]
    };
    this.$ionicPopup.show(options);
  }
}

export default ['settings.factory', '$ionicPopup', SettingsController];
