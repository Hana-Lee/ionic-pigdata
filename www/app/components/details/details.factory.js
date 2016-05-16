/**
 * @author Hana Lee
 * @since 2016-05-16 17:00
 */

let detailsFactory = function () {
  var resources = [{
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
    all : all,
    remove : remove,
    get : get
  };

  function all() {
    return resources;
  }
  function remove(chat) {
    resources.splice(resources.indexOf(chat), 1);
  }
  function get(chatId) {
    for (var i = 0; i < resources.length; i++) {
      if (resources[i].id === parseInt(chatId)) {
        return resources[i];
      }
    }
    return null;
  }
};

export default [detailsFactory];
