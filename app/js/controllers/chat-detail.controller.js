/**
 * @author Hana Lee
 * @since 2016-05-15 00:33
 */

export class ChatDetailController {
  constructor($stateParams, Chats) {
    this.chat = Chats.get($stateParams.chatId);
  }
}
