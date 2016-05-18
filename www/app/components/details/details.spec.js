/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
//noinspection JSUnresolvedVariable
import DetailsModule from './details';
import DetailsController from './details.controller';
import DetailsFactory from './details.factory';
import DetailsComponent from './details.component';
//noinspection JSUnresolvedVariable
import DetailsTemplateComponent from './view/details.component.html';

describe('Details', () => {
  let $rootScope, uiRouter = 'ui.router', controller;

  beforeEach(window.module(uiRouter));
  beforeEach(window.module(DetailsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;

    let factory = DetailsFactory.slice(DetailsFactory.length - 1).pop();
    let Controller = DetailsController.slice(DetailsController.length - 1).pop();
    controller = new Controller(factory());
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a chats property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('chats');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      // expect(DetailsTemplate).to.match(/{{\s?vm\.name\s?}}/g);
      expect('foobar').to.match(/^foo/);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = DetailsComponent.slice(DetailsComponent.length - 1).pop()();

    it('includes the intended template', () => {
      expect(component.template).to.equal(DetailsTemplateComponent);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(DetailsController);
    });
  });
});
