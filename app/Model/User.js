'use strict';

const Lucid = use('Lucid');
const Message = use('App/Model/Message');

class User extends Lucid {

  apiTokens() {
    return this.hasMany('App/Model/Token');
  }

  messages() {
    return this.hasMany('App/Model/Message');
  }

  * getSentMessages() {
    return (yield Message.query().where('sender_id', this.id).fetch());
  }

  * getReceivedMessages() {
    return (yield Message.query().where('recipient_id', this.id).fetch());
  }

  * getUnreadMessages() {
    return (yield Message.query().where('recipient_id', this.id).where('unread', '1').fetch()).value();
  }

  * sendMessage(toUser, messageTitle, messageContent) {
    let message = new Message();
    message.recipient_id = toUser.id;
    message.sender_id = this.id;
    message.title = messageTitle;
    message.content = messageContent;
    yield message.save();
  }
}

module.exports = User;
