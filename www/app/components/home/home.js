/**
 * @author Hana Lee
 * @since 2016-05-16 16:21
 */

import homeComponent from './home.component';
import homeFactory from './home.factory';
import homeRouter from './home.router';

let homeModule = angular.module('PIGDATA.home', [])
  .config(homeRouter)
  .directive('home', homeComponent)
  .factory('home.factory', homeFactory);

export default homeModule;
