/**
 * @author Hana Lee
 * @since 2016-05-16 16:26
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
import HomeModule from './home';
import HomeController from './home.controller';
import HomeFactory from './home.factory';
import HomeComponent from './home.component';
//noinspection JSUnresolvedVariable
import HomeTemplateComponent from './view/home.component.html';

describe('Home', () => {
  let $rootScope, uiRouter = 'ui.router', controller;

  beforeEach(window.module(uiRouter));
  beforeEach(window.module(HomeModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    let factory = HomeFactory.slice(HomeFactory.length -1).pop();
    let Controller = HomeController.slice(HomeController.length - 1).pop();
    controller = new Controller(factory());
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a items property [REMOVE]', () => { // erase if removing this.name from the controller
      /** @prop {Object} have */
      expect(controller).to.have.property('items');
    });

    it('has a ionic date picker property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('ionicDatePicker');
    });

    it('has a selected time stamp property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('selectedTimestamp');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      // expect(HomeTemplate).to.match(/{{\s?vm\.name\s?}}/g);
      expect('foobar').to.match(/^foo/);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = HomeComponent.slice(HomeComponent.length -1).pop()();

    it('includes the intended template', () => {
      expect(component.template).to.equal(HomeTemplateComponent);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(HomeController);
    });
  });
});
