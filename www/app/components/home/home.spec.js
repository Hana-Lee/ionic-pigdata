/**
 * @author Hana Lee
 * @since 2016-05-16 16:26
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
import QUERIES from '../../shared/queries.constant';
import HomeModule from './home';
import HomeController from './home.controller';
import HomeFactory from './home.factory';
import HomeComponent from './home.component';
import SqliteService from '../../shared/sqlite.service';
//noinspection JSUnresolvedVariable
import HomeTemplateComponent from './view/home.component.html';

describe('Home', () => {
  let $rootScope, uiRouter = 'ui.router', controller, ionic = 'ionic', ngCordova = 'ngCordova';

  beforeEach(window.module(ionic));
  beforeEach(window.module(ngCordova));
  beforeEach(window.module(uiRouter));
  beforeEach(window.module(HomeModule.name));
  beforeEach(inject((_$rootScope_, _$q_, _$cordovaSQLite_) => {
    $rootScope = _$rootScope_;
    let Service = SqliteService.slice(SqliteService.length - 1).pop();
    let sqliteService = new Service(_$q_, _$cordovaSQLite_);
    let factory = HomeFactory.slice(HomeFactory.length - 1).pop();
    let Controller = HomeController.slice(HomeController.length - 1).pop();
    controller = new Controller(factory(_$q_, sqliteService, QUERIES));
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a items property', () => { // erase if removing this.name from the controller
      /** @prop {Object} have */
      expect(controller).to.have.property('items');
    });

    it('has a ionic date picker property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('ionicDatePicker');
    });

    it('has a selectedDate property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('selectedDate');
    });

    it('has a factory property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('factory');
    });

    it('has a $ionicPopup property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('$ionicPopup');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
      // expect(HomeTemplate).to.match(/{{\s?vm\.name\s?}}/g);
      expect('foobar').to.match(/^foo/);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = HomeComponent.slice(HomeComponent.length - 1).pop()();

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
