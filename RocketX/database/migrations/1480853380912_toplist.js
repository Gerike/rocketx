'use strict';

const Schema = use('Schema');

class ToplistTableSchema extends Schema {

  up () {
    this.create('toplist', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id');
      table.integer('points');
      table.foreign('user_id').references('user.id')
    })
  }

  down () {
    this.drop('toplist')
  }

}

module.exports = ToplistTableSchema;
