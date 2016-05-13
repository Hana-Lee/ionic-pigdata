angular.module('PIGDATA.services', [])

  .factory('Items', function () {
    return {
      all : function () {
        return dummy_items;
      },
      update : function (item) {
      },
      delete : function (item) {
      },
      create : function (item) {
      },
      get : function (itemId) {
        for (var i = 0; i < dummy_items.length; i++) {
          if (dummy_items[i].id === parseInt(itemId, 10)) {
            return dummy_items[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id : 0,
      name : 'Ben Sparrow',
      lastText : 'You on your way?',
      face : 'img/ben.png'
    }, {
      id : 1,
      name : 'Max Lynx',
      lastText : 'Hey, it\'s me',
      face : 'img/max.png'
    }, {
      id : 2,
      name : 'Adam Bradleyson',
      lastText : 'I should buy a boat',
      face : 'img/adam.jpg'
    }, {
      id : 3,
      name : 'Perry Governor',
      lastText : 'Look at my mukluks!',
      face : 'img/perry.png'
    }, {
      id : 4,
      name : 'Mike Harrington',
      lastText : 'This is wicked good ice cream.',
      face : 'img/mike.png'
    }];

    return {
      all : function () {
        return chats;
      },
      remove : function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get : function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
