
export class UserService {
  constructor($q, SqliteService) {
    this.$inject = ['$q', 'SqliteService'];

    this.getAll = function () {
      var query = 'Select * FROM Users';
      return $q.when(SqliteService.getItems(query));
    };
    this.add = function (user) {
      var query = 'INSERT INTO Users (Name) VALUES (?)';
      return $q.when(SqliteService.executeSql(query, [user.Name]));
    };
  }
}
