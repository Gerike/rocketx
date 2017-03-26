'use strict';

const Lucid = use('Lucid');

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token');
  }

  messages (){
    return this.hasMany('App/Model/Message');
  }

}

module.exports = User;
