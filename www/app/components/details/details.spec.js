/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/* jshint -W064 */
//noinspection JSUnresolvedVariable
import DetailsModule from './details';//noinspection JSUnresolvedVariable
import DetailsController from './details.controller';//noinspection JSUnresolvedVariable
import DetailsComponent from './details.component';//noinspection JSUnresolvedVariable
import DetailsTemplate from './view/details.html';

describe('Details', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DetailsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DetailsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(DetailsTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = DetailsComponent[0]();

    it('includes the intended template',() => {
      expect(component.template).to.equal(DetailsTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(DetailsController);
    });
  });
});
