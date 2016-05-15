/**
 * @author Hana Lee
 * @since 2016-05-14 20:38
 */

var queries = [
  //Drop tables
  "DROP TABLE IF EXISTS Users;",
  //Create tables
  "CREATE TABLE Users (IdUser integer primary key autoincrement, Name text not null);",
  //Insert Users
  "INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
  "INSERT INTO 'Users' ('Name') VALUES ('Khriztian Moreno Zuluaga');",
  "INSERT INTO 'Users' ('Name') VALUES ('Cristian Rivas Buitrago');",
  "INSERT INTO 'Users' ('Name') VALUES ('Juan David Sánchez');",
  "INSERT INTO 'Users' ('Name') VALUES ('Nicolas Molina');",
  "INSERT INTO 'Users' ('Name') VALUES ('Miyamoto Musashi FIlander');",
  "INSERT INTO 'Users' ('Name') VALUES ('Didier Hernandez');",
  "INSERT INTO 'Users' ('Name') VALUES ('Luis Eduardo Oquendo Pérez');",
  "INSERT INTO 'Users' ('Name') VALUES ('Carlos Rojas');",
  "INSERT INTO 'Users' ('Name') VALUES ('Levano Castilla Carlos Miguel');"
];
export class SqliteService {
  constructor($q, $cordovaSQLite) {
    this.$inject = ['$q', '$cordovaSQLite'];

    var self = this;
    var _db;

    self.db = function () {
      if (!_db) {
        if (window.sqlitePlugin !== undefined) {
          console.log('window sqlite plugin use');
          _db = window.sqlitePlugin.openDatabase({name : 'pigdata.db', location : 2, createFromLocation : 1});
        } else {
          // For debugging in the browser
          console.log('window open database use');
          _db = window.openDatabase('pigdata.db', '1.0', 'Database', 200000);
        }
      }
      return _db;
    };

    self.getFirstItem = function (query, parameters) {
      var deferred = $q.defer();
      self.executeSql(query, parameters).then(function (res) {

        if (res.rows.length > 0) {
          return deferred.resolve(res.rows.item(0));
        } else {
          return deferred.reject('There aren\'t items matching');
        }
      }, function (err) {
        return deferred.reject(err);
      });

      return deferred.promise;
    };

    self.getFirstOrDefaultItem = function (query, parameters) {
      var deferred = $q.defer();
      self.executeSql(query, parameters).then(function (res) {

        if (res.rows.length > 0) {
          return deferred.resolve(res.rows.item(0));
        } else {
          return deferred.resolve(null);
        }
      }, function (err) {
        return deferred.reject(err);
      });

      return deferred.promise;
    };

    self.getItems = function (query, parameters) {
      var deferred = $q.defer();
      self.executeSql(query, parameters).then(function (res) {
        var items = [];
        for (var i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
        return deferred.resolve(items);
      }, function (err) {
        return deferred.reject(err);
      });

      return deferred.promise;
    };

    self.preloadDataBase = function (enableLog) {
      var deferred = $q.defer();

      console.log('preload data base');

      if (window.sqlitePlugin === undefined) {
        if (enableLog) {
          console.log('%c *** Starting the creation of the database in the browser *** ',
            'background: #222; color: #bada55');
        }
        self.db().transaction(function (tx) {
          for (var i = 0; i < queries.length; i++) {
            var query = queries[i].replace(/\\n/g, '\n');

            if (enableLog) {
              console.log(queries[i]);
            }
            tx.executeSql(query);
          }
        }, function (error) {
          deferred.reject(error);
        }, function () {
          if (enableLog) {
            console.log('%c *** Completing the creation of the database in the browser *** ',
              'background: #222; color: #bada55');
          }
          deferred.resolve('OK');
        });
      }
      else {
        deferred.resolve('OK');
      }

      return deferred.promise;
    };

    self.executeSql = function (query, parameters) {
      return $cordovaSQLite.execute(self.db(), query, parameters);
    };
  }
}
