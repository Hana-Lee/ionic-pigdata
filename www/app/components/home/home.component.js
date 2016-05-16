/**
 * @author Hana Lee
 * @since 2016-05-16 16:22
 */

//noinspection JSUnresolvedVariable
import template from './view/home.component.html';
import controller from './home.controller.js';

let homeComponent = function () {
  return {
    restrict : 'E',
    scope : {},
    template,
    controller,
    controllerAs : 'vm',
    bindToController : true
  };
};

export default [homeComponent];
