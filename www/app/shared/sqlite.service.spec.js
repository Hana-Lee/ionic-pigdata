/**
 * @author Hana Lee
 * @since 2016-05-19 20:36
 */

/* jshint -W064 */
import QUERIES from './queries.constant';
import SqliteService from './sqlite.service';
import LogProvider from './log.provider';

describe('SqliteService', () => {
  let service, ionic = 'ionic', ngCordova = 'ngCordova';

  beforeEach(window.module(ngCordova));
  beforeEach(window.module(ionic));

  beforeEach(inject((_$q_, _$cordovaSQLite_) => {
    let Service = SqliteService.slice(SqliteService.length - 1).pop();
    let Log = LogProvider.slice(LogProvider.length - 1).pop();
    let pdLog = new Log();

    service = new Service(_$q_, _$cordovaSQLite_, QUERIES, pdLog);
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

    it('has a _pdLog property', () => {
      expect(service).to.have.property('_pdLog');
    });
  });
});
