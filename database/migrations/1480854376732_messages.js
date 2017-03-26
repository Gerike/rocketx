'use strict';

const Schema = use('Schema');

class MessagesTableSchema extends Schema {

  up() {
    this.create('messages', (table) => {
      table.increments();
      table.timestamps();
      table.integer('sender_id');
      table.integer('recipient_id');
      table.string('title');
      table.string('content');
      table.boolean('unread').defaultTo(true);
      table.foreign('sender_id').references('users.id');
      table.foreign('recipient_id').references('users.id');
    });
  }

  down() {
    this.drop('messages');
  }
}

module.exports = MessagesTableSchema;
