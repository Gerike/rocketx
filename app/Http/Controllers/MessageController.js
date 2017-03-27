'use strict';

const Database = use('Database');
const Hash = use('Hash');
const Message = use('App/Model/Message');
const User = use('App/Model/User');

class MessageController{
  * showMessages (request, response) {
    yield response.sendView('messages');
  }

  * getUnreadMessages(request, response){
    yield (yield request.currentUser.getUnreadMessages()).value();
  }

  *getUnreadMessageCount(request, response){
    response.json({count : (yield request.currentUser.getUnreadMessages()).value().length});
  }
}

module.exports = MessageController;
