'use strict';

const Schema = use('Schema');

class MessagesTableSchema extends Schema {

  up () {
    this.create('messages', (table) => {
      table.increments();
      table.timestamps();
      table.integer('sender_id');
      table.integer('recipient_id');
      table.string('content');
      table.foreign('sender_id').references('user.id');
      table.foreign('recipient_id').references('user.id');
    })
  }

  down () {
    this.drop('messages');
  }

}

module.exports = MessagesTableSchema;
