/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import 'nvd3/build/nv.d3.min.js';
import nvd3 from 'angular-nvd3';
import detailsComponent from './details.component';
import detailsFactory from './details.factory';
import detailsRouter from './details.router';

let homeModule = angular.module('PIGDATA.details', [nvd3])
  .config(detailsRouter)
  .directive('itemDetails', detailsComponent)
  .factory('details.factory', detailsFactory);

export default homeModule;
