/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

//noinspection JSUnresolvedVariable
import template from './view/details.component.html';
import controller from './details.controller.js';

let detailsComponent = function () {
  return {
    restrict : 'E',
    scope : {},
    template,
    controller,
    controllerAs : 'vm',
    bindToController : true
  };
};

export default [detailsComponent];
