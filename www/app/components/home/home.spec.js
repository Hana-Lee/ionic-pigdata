/**
 * @author Hana Lee
 * @since 2016-05-16 16:26
 */

import QUERIES from '../../shared/queries.constant';
import HomeModule from './home';
import HomeController from './home.controller';
import HomeFactory from './home.factory';
import HomeComponent from './home.component';
import SqliteServiceModule from '../../shared/sqlite.service';
import ItemServiceModule from '../../shared/item.service';
import LogProvider from '../../shared/log.provider';
//noinspection JSUnresolvedVariable
import HomeTemplateComponent from './view/home.component.html';

describe('Home', () => {
  let uiRouter = 'ui.router', controller, ionic = 'ionic', ngCordova = 'ngCordova';

  beforeEach(window.module(uiRouter));
  beforeEach(window.module(ngCordova));
  beforeEach(window.module(ionic));
  beforeEach(window.module(HomeModule.name));

  beforeEach(inject((_$q_, _$cordovaSQLite_, _$ionicPopup_) => {
    let Log = LogProvider.slice(LogProvider.length - 1).pop();
    let pdLog = new Log();
    let ItemService = ItemServiceModule.slice(ItemServiceModule.length - 1).pop();
    let SqliteService = SqliteServiceModule.slice(SqliteServiceModule.length - 1).pop();
    let sqliteService = new SqliteService(_$q_, _$cordovaSQLite_, QUERIES, pdLog);
    let factory = HomeFactory.slice(HomeFactory.length - 1).pop();
    let Controller = HomeController.slice(HomeController.length - 1).pop();

    //factory, ionicDatePicker, $ionicPopup, ItemService
    controller = new Controller(
      factory(_$q_, sqliteService, QUERIES),
      null, //ionicDatePicker
      _$ionicPopup_,
      new ItemService(_$q_, sqliteService, QUERIES)
    );
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a items property', () => {
      /** @prop {Object} have */
      expect(controller).to.have.property('items');
    });

    it('has a DatePickerService property', () => {
      expect(controller).to.have.property('DatePickerService');
    });

    it('has a selectedDate property', () => {
      expect(controller).to.have.property('selectedDate');
    });

    it('has a factory property', () => {
      expect(controller).to.have.property('factory');
    });

    it('has a $ionicPopup property', () => {
      expect(controller).to.have.property('$ionicPopup');
    });

    it('has a showReorder property', () => {
      expect(controller).to.have.property('showReorder');
    });

    it('has a ItemService property', () => {
      expect(controller).to.have.property('ItemService');
    });

    it('has a pdLog property', () => {
      expect(controller).to.have.property('pdLog');
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
