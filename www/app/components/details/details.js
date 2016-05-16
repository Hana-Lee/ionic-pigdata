/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import detailsComponent from './details.component';
import detailsFactory from './details.factory';
import detailsRouter from './details.router';

let homeModule = angular.module('PIGDATA.details', [])
  .config(detailsRouter)
  .directive('details', detailsComponent)
  .factory('details.factory', detailsFactory);

export default homeModule;
