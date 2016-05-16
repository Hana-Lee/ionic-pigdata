/**
 * @author Hana Lee
 * @since 2016-05-16 16:44
 */

import router from './base.router';

let baseModule = angular.module('PIGDATA.base', [])
  .config(router);

export default baseModule;
