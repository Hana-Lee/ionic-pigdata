/**
 * @author Hana Lee
 * @since 2016-05-16 15:35
 */

import SqliteService from './shared/sqlite.service.js';
import Components from './components/components';
import onReady from './bootstrap';
import config from './app.config';

let mainModuleList = ['ionic', 'ngCordova', 'ionic-datepicker', Components.name];

angular.module('PIGDATA', mainModuleList)
  .run(onReady)
  .config(config)
  .service('SqliteService', SqliteService);