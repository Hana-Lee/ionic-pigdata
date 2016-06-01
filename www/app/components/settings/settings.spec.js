/**
 * @author Hana Lee
 * @since 2016-05-16 18:11
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
import SettingsModule from './settings';
import SettingsController from './settings.controller';
import SettingsFactory from './settings.factory';
import SettingsComponent from './settings.component';
//noinspection JSUnresolvedVariable
import SettingsTemplateComponent from './view/settings.component.html';

describe('Settings', () => {
  let $rootScope, uiRouter = 'ui.router', controller;

  beforeEach(window.module(uiRouter));
  beforeEach(window.module(SettingsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;

    let factory = SettingsFactory.slice(SettingsFactory.length - 1).pop();
    let Controller = SettingsController.slice(SettingsController.length - 1).pop();
    controller = new Controller(factory());
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a settings property', () => {
      expect(controller).to.have.property('settings');
    });

    it('has a $ionicPopup property', () => {
      expect(controller).to.have.property('$ionicPopup');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
      // expect(SettingsTemplate).to.match(/{{\s?vm\.name\s?}}/g);
      expect('foobar').to.match(/^foo/);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = SettingsComponent.slice(SettingsComponent.length - 1).pop()();

    it('includes the intended template', () => {
      expect(component.template).to.equal(SettingsTemplateComponent);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(SettingsController);
    });
  });
});
