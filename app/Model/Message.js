'use strict';

const Lucid = use('Lucid');
const User = use('App/Model/User');

class Message extends Lucid {

  static get hidden () {
    return ['sender_id', 'recipient_id'];
  }

  toJSON(){
    return {
      id: this.id,
      recipient: this.recipient_id,
      sender: this.sender_id,
      content: this.content,
      title: this.title,
      sent: this.created_at,
      unread: this.unread
    };
  }
}

module.exports = Message;
