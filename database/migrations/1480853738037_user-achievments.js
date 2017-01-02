'use strict';

const Schema = use('Schema');

class UserAchievmentsTableSchema extends Schema {

  up () {
    this.create('user-achievments', (table) => {
      table.increments();
      table.timestamps();
      table.integer('user_id');
      table.integer('achievment_id');
      table.foreign('user_id').references('user.id');
      table.foreign('achievment_id').references('achievments.id');
    })
  }

  down () {
    this.drop('user-achievments');
  }

}

module.exports = UserAchievmentsTableSchema;
