/**
 * @author Hana Lee
 * @since 2016-05-16 17:57
 */

import config from '../../shared/config';

let detailsRouter = function ($stateProvider) {
  $stateProvider
    .state('base.details', {
      url : '/details/:selectedItemId', views : {
        'base-details' : {
          templateUrl : `${config.pathTemplate}/details/view/details.html`
        }
      }
    });
};

export default ['$stateProvider', detailsRouter];
