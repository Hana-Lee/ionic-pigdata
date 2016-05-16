/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/* jshint -W064 */
//noinspection JSUnresolvedVariable
import DetailsModule from './base';//noinspection JSUnresolvedVariable
import DetailsTemplate from './view/base.html';

describe('Details', () => {
  let $rootScope;

  beforeEach(window.module(DetailsModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(DetailsTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });
});
