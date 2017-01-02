'use strict';

const Schema = use('Schema');

class ToplistTableSchema extends Schema {

  up () {
    this.create('toplist', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id', 11).unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('points');
    })
  }

  down () {
    this.drop('toplist')
  }

}

module.exports = ToplistTableSchema;
