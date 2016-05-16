/**
 * @author Hana Lee
 * @since 2016-05-16 15:35
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ng-cordova/dist/ng-cordova.min';
import 'ionic-sdk/release/js/ionic.bundle.min';
import 'ionic-datepicker/dist/ionic-datepicker.bundle.min';
import SqliteService from './shared/sqlite.service.js';
import Components from './components/components';
import onReady from './bootstrap';
import router from './router';
(() => {
  angular.module('PIGDATA', ['ionic', 'ngCordova', uiRouter, 'ionic-datepicker', Components.name])
    .run(onReady).config(router).service('SqliteService', SqliteService);
})();
