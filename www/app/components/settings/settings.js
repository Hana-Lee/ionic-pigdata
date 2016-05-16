/**
 * @author Hana Lee
 * @since 2016-05-16 18:10
 */

import settingsComponent from './settings.component';
import settingsFactory from './settings.factory';
import settingsRouter from './settings.router';

let settingsModule = angular.module('PIGDATA.settings', [])
  .config(settingsRouter)
  .directive('settings', settingsComponent)
  .factory('settings.factory', settingsFactory);

export default settingsModule;
