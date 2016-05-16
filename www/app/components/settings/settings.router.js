/**
 * @author Hana Lee
 * @since 2016-05-16 18:12
 */

import config from '../../shared/config';

let settingsRouter = function ($stateProvider) {
  $stateProvider
    .state('base.settings', {
      url : '/settings', views : {
        'base-settings' : {
          templateUrl : `${config.pathTemplate}/settings/view/settings.html`
        }
      }
    });
};

export default ['$stateProvider', settingsRouter];
