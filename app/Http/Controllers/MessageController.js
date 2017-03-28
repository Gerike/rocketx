'use strict';

const Database = use('Database');
const Hash = use('Hash');
const Message = use('App/Model/Message');
const User = use('App/Model/User');

class MessageController {
  * showMessages(request, response) {
    yield response.sendView('messages');
  }

  * getUnreadMessages(request, response) {
    yield (yield request.currentUser.getUnreadMessages()).value();
  }

  * getUnreadMessageCount(request, response) {
    response.json({count: (yield request.currentUser.getUnreadMessages()).length});
  }

  * getSentMessages(request, response) {
    response.json({messages: (yield request.currentUser.getSentMessages()).value()});
  }

  *getReceivedMessages(request, response) {
    response.json({messages: (yield request.currentUser.getReceivedMessages()).value()});
  }

  *markAsRead(request, response) {
    const messageId = request.post().id;
    if (!messageId)
      response.status(400).send();

      const message = yield Message.findByOrFail('id', messageId);
      if (message.recipient_id === request.currentUser.id) {
        message.unread = 0;
        yield message.save();
        response.status(204).send();
      }
      else
        response.status(403).send();
    }
}

module.exports = MessageController;
