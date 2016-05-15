/**
 * @author Hana Lee
 * @since 2016-05-14 20:35
 */

import {onReady} from './bootstrap';
import {router} from './router';
import {MainController} from './controllers/main.controller';
import {ChatController} from './controllers/chat.controller';
import {AccountController} from './controllers/account.controller';
import {ChatDetailController} from './controllers/chat-detail.controller';
import {ItemService} from './services/items.service';
import {ChatService} from './services/chat.service';
import {UserService} from './services/user.service';
import {SqliteService} from './services/sqlite.service';

// (() => {
angular.module('PIGDATA', [
  'ionic', 'ionic.service.core', 'ngCordova',
  'PIGDATA.controllers', 'PIGDATA.services',
  'ionic-datepicker'
])
  .config(router)
  .run(onReady)
  .service('SqliteService', SqliteService);

angular.module('PIGDATA.controllers', [])
  .controller('MainCtrl', MainController)
  .controller('ChatCtrl', ChatController)
  .controller('ChatDetailCtrl', ChatDetailController)
  .controller('AccountCtrl', AccountController);

angular.module('PIGDATA.services', [])
  .service('Items', ItemService)
  .service('Chats', ChatService)
  .service('Users', UserService);
// })();
