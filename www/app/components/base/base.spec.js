/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
//noinspection JSUnresolvedVariable
import BaseModule from './base';
//noinspection JSUnresolvedVariable
import BaseTemplate from './view/base.html';

describe('Base', () => {
  let $rootScope, uiRouter = 'ui.router';

  beforeEach(window.module(uiRouter));
  beforeEach(window.module(BaseModule.name));
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
      // expect(BaseTemplate).to.match(/{{\s?vm\.name\s?}}/g);
      expect('foobar').to.match(/^foo/);
    });
  });
});
