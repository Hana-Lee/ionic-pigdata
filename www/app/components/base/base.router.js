/**
 * @author Hana Lee
 * @since 2016-05-16 16:47
 */

import config from '../../shared/config';

let baseRouter = function ($stateProvider) {
  $stateProvider
    .state('base', {
      url : '/base', abstract : true,
      templateUrl : `${config.pathTemplate}/base/view/base.html`
    });
};

export default ['$stateProvider', baseRouter];
