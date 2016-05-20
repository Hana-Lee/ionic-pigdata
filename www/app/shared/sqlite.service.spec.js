/**
 * @author Hana Lee
 * @since 2016-05-19 20:36
 */

/* jshint -W064 */
/*globals describe, beforeEach, it */
import SqliteService from './sqlite.service';

describe('SqliteService', () => {
  let service;

  // beforeEach(window.module('PIGDATA'));

  beforeEach(inject((_$q_) => {
    let Service = SqliteService.slice(SqliteService.length - 1).pop();
    service = new Service(_$q_);
  }));

  describe('Service', () => {
    it('has a _$q property', () => {
      expect(service).to.have.property('_$q');
    });

    it('has a _$cordovaSQLite property', () => {
      expect(service).to.have.property('_$cordovaSQLite');
    });

    it('has a _db property', () => {
      expect(service).to.have.property('_db');
    });

    it('has a _INIT_QUERIES property', () => {
      expect(service).to.have.property('_INIT_QUERIES');
    });
  });
});
