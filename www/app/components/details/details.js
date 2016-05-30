/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

import 'nvd3/build/nv.d3.min.js';
import nvd3 from 'angular-nvd3';
import detailsComponentAttr from './details.component.attr';
import detailsFactory from './details.factory';
import detailsRouter from './details.router';
import detailsController from './details.controller';

let homeModule = angular.module('PIGDATA.details', [nvd3])
  .config(detailsRouter)
  .directive('groupedRadio', detailsComponentAttr)
  .factory('details.factory', detailsFactory)
  .controller('details.controller', detailsController);

export default homeModule;
