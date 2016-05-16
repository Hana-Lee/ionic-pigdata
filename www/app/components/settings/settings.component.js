/**
 * @author Hana Lee
 * @since 2016-05-16 18:11
 */

//noinspection JSUnresolvedVariable
import template from './view/settings.component.html';
import controller from './settings.controller';

let settingsComponent = function () {
  return {
    restrict : 'E',
    scope : {},
    template,
    controller,
    controllerAs : 'vm',
    bindToController : true
  };
};

export default [settingsComponent];
