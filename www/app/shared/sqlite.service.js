/**
 * @author Hana Lee
 * @since 2016-05-16 16:02
 */

class SqliteService {
  constructor($q, $cordovaSQLite) {
    this._db = undefined;
    this._$q = $q;
    this._$cordovaSQLite = $cordovaSQLite;

    const CREATE_TABLE_ITEMS =
      'CREATE TABLE IF NOT EXISTS `Items` (' +
      '`id` INTEGER NOT NULL,' +
      '`seq` INTEGER NOT NULL UNIQUE,' +
      '`name` VARCHAR(255) NOT NULL,' +
      '`unit` TINYINT NOT NULL DEFAULT (1),' +
      '`enabled` TINYINT NOT NULL DEFAULT (1),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`deleted` TIMESTAMP,' +
      'PRIMARY KEY (`id`),' +
      'CHECK (`unit` IN (1, 5, 10)), CHECK (`seq` >= 0), CHECK (`enabled` IN (0, 1))' +
      ');';

    const CREATE_TABLE_VALUES =
      'CREATE TABLE IF NOT EXISTS `Values` (' +
      '`id` INTEGER NOT NULL,' +
      '`item_id` INTEGER NOT NULL,' +
      '`value` INTEGER NOT NULL DEFAULT (0),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      'PRIMARY KEY (`id`),' +
      'FOREIGN KEY (`item_id`) REFERENCES `Items`(`id`),' +
      'CHECK (`value` >= 0)' +
      ');';

    const CREATE_TABLE_SETTINGS =
      'CREATE TABLE IF NOT EXISTS `Settings` (' +
      '`id` INTEGER NOT NULL,' +
      '`code` VARCHAR(25) NOT NULL,' +
      '`name` VARCHAR(50) NOT NULL,' +
      '`type` VARCHAR(20) NOT NULL DEFAULT (\'boolean\'),' +
      '`opt_code` VARCHAR(255) NOT NULL DEFAULT (\'true|false\'),' +
      '`opt_name` VARCHAR(255) NOT NULL DEFAULT (\'true|false\'),' +
      '`value` VARCHAR(255) NOT NULL DEFAULT (\'true\'),' +
      '`created` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      '`updated` TIMESTAMP NOT NULL DEFAULT (STRFTIME(\'%s\', \'now\') || \'000\'),' +
      'PRIMARY KEY (`id`)' +
      ');';

    this._INIT_QUERIES = [
      CREATE_TABLE_ITEMS, CREATE_TABLE_VALUES, CREATE_TABLE_SETTINGS,
      'INSERT INTO `Items` (`seq`, `name`) VALUES (0, \'물 마시기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (1, \'커피 마시기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (2, \'담배 피우기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (3, \'사랑한다 말하기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (4, \'영어단어 외우기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (5, \'소변 보기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (6, \'대변 보기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (7, \'머리 감기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (8, \'샤워 하기\');',
      'INSERT INTO `Items` (`seq`, `name`) VALUES (9, \'양치질 하기\');',
      'INSERT INTO `Settings` (`code`, `name`, `type`, `opt_code`, `opt_name`, `value`) VALUES' +
      '(\'tab_position\', \'탭위치\', \'choice\', \'top|bottom\', \'상단|하단\', \'bottom\');'
    ];
    this.preloadDataBase();
  }

  preloadDataBase() {
    let deferred = this._$q.defer();
    if (!this._db) {
      if (window.sqlitePlugin !== undefined) {
        console.info('window sqlite plugin use');
        let params = {name : 'pigdata.db', location : 2, createFromLocation : 1};
        this._db = window.sqlitePlugin.openDatabase(params);
      } else {
        // For debugging in the browser
        console.info('window open database use');
        this._db = window.openDatabase('pigdata.db', '1.0', 'Database', 200000);
        this._initData().then(
          (result) => {deferred.resolve(result);},
          (err) => {deferred.reject(err);}
        );
      }
    }
    return deferred.promise;
  }

  _initData() {
    let deferred = this._$q.defer();
    console.info('%c *** Starting the creation of the database in the browser *** ',
      'background: #222; color: #bada55');
    this._db.transaction((tx) => {
      for (let i = 0; i < this._INIT_QUERIES.length; i++) {
        let query = this._INIT_QUERIES[i].replace(/\\n/g, '\n');

        console.info(this._INIT_QUERIES[i]);
        tx.executeSql(query);
      }
    }, (error) => {
      deferred.reject(error);
    }, () => {
      console.info('%c *** Completing the creation of the database in the browser *** ',
        'background: #222; color: #bada55');
      deferred.resolve('OK');
    });

    return deferred.promise;
  }

  getItem(query, parameters) {
    let deferred = this._$q.defer();
    this.executeSql(query, parameters).then(function (res) {

      if (res.rows.length > 0) {
        deferred.resolve(res.rows.item(0));
      } else {
        console.error('There aren\'t item matching : ', query, parameters);
        deferred.resolve(null);
      }
    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  getItems(query, parameters) {
    let deferred = this._$q.defer();
    this.executeSql(query, parameters).then((res) => {
      let rowsLength = res.rows.length;
      if (rowsLength > 0) {
        let items = [];
        for (let i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
        deferred.resolve(items);
      } else {
        console.error('There aren\'t items matching : ', query, parameters);
        deferred.resolve(null);
      }
    }, (err) => {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  executeSql(query, parameters) {
    return this._$cordovaSQLite.execute(this._db, query, parameters);
  }
}

export default ['$q', '$cordovaSQLite', SqliteService];
