/**
 * @author Hana Lee
 * @since 2016-05-15 00:36
 */

export class ChatController {
  constructor(Chats) {
    this.chats = Chats.all();
    this.remove = function (chat) {
      Chats.remove(chat);
    };
  }
}
