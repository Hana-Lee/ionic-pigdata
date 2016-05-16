/**
 * @author Hana Lee
 * @since 2016-05-14 22:07
 */

let onReady = function ($ionicPlatform, SqliteService) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }

    //noinspection JSUnresolvedFunction
    SqliteService.preloadDataBase(true);
  });
};

export default ['$ionicPlatform', 'SqliteService', onReady];
