/**
 * @author Hana Lee
 * @since 2016-05-16 16:44
 */

import router from './base.router';
import controller from './base.controller';

let baseModule = angular.module('PIGDATA.base', [])
  .config(router)
  .controller('base.controller', controller);

export default baseModule;
