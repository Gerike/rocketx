'use strict';

const Schema = use('Schema');

class AchievmentsTableSchema extends Schema {

  up () {
    this.create('achievments', (table) => {
      table.increments();
      table.string('name');
    })
  }

  down () {
    this.drop('achievments');
  }

}

module.exports = AchievmentsTableSchema;
