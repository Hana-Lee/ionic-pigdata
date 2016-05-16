/**
 * @author Hana Lee
 * @since 2016-05-16 16:33
 */

import config from '../../shared/config';

let homeRouter = function ($stateProvider) {
  $stateProvider
    .state('base.home', {
      url : '/home', views : {
        'base-home' : {
          templateUrl : `${config.pathTemplate}/home/view/home.html`
        }
      }
    });
};

export default ['$stateProvider', homeRouter];
