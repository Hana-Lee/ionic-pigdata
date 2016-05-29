/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
import QUERIES from '../../shared/queries.constant';
import SqliteServiceModule from '../../shared/sqlite.service';
import ItemServiceModule from '../../shared/item.service';
import DetailsModule from './details';
import DetailsController from './details.controller';
import DetailsFactory from './details.factory';
import DetailsComponent from './details.component';
//noinspection JSUnresolvedVariable
import DetailsTemplateComponent from './view/details.component.html';

describe('Details', () => {
  let uiRouter = 'ui.router', controller, ionic = 'ionic', ngCordova = 'ngCordova';

  beforeEach(window.module(ionic));
  beforeEach(window.module(ngCordova));
  beforeEach(window.module(uiRouter));
  beforeEach(window.module(DetailsModule.name));
  
  beforeEach(inject((_$q_, _$cordovaSQLite_) => {
    let SqliteService = SqliteServiceModule.slice(SqliteServiceModule.length -1).pop();
    let ItemService = ItemServiceModule.slice(ItemServiceModule.length - 1).pop();
    let factory = DetailsFactory.slice(DetailsFactory.length - 1).pop();
    let Controller = DetailsController.slice(DetailsController.length - 1).pop();
    controller = new Controller(
      factory(), new ItemService(_$q_, new SqliteService(_$q_, _$cordovaSQLite_, QUERIES), QUERIES)
    );
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a factory property', () => {
      expect(controller).to.have.property('factory');
    });

    it('has a ItemService property', () => {
      expect(controller).to.have.property('ItemService');
    });

    it('has a items property', () => {
      expect(controller).to.have.property('items');
    });

    it('has a viewType property', () => {
      expect(controller).to.have.property('viewType');
    });

    it('has a chart property', () => {
      expect(controller).to.have.property('chart');
    });

    it('has a selectedItem property', () => {
      expect(controller).to.have.property('selectedItem');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
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
