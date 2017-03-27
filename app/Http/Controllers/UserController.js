'use strict';
const Database = use('Database');
const Hash = use('Hash');
const Message = use('App/Model/Message');
const User = use('App/Model/User');

class UserController {

  * logout(request, response) {
    yield request.auth.logout();
    response.redirect('/');
  }

  * login(request, response) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      yield request.auth.attempt(email, password);
      response.redirect('/');
    }
    catch (e) {
      response.status(401).send('Invalid credentials');
    }
  }

  * register(request, response) {
    if (request.method() === "POST") {
      const email = request.input('email');
      const username = request.input('username');
      const password = request.input('password');
      const errors = yield this.validateRegistrationData(email, username, password);
      if (!errors.length) {
        const user = yield this.createUser(email, username, password);
        yield this.sendWelcomeMail(user);
        yield request.auth.attempt(email, password);
        response.redirect('/');
      }
      else
        yield response.sendView('register', {errors});
    }
    else
      yield response.sendView('register');
  }

  * createUser(email, username, password) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = yield Hash.make(password);
    yield user.save();
    return user;
  }

  * validateRegistrationData(email, username, password) {
    let errors = [];
    if (this.isCredentialNotLongEnough(username) || this.isCredentialNotLongEnough(password))
      errors.push('Username and password must be at least 4 characters');

    if (yield this.isEmailAlreadyExist(email))
      errors.push('Already registered with this email');

    if (yield this.isUsernameAlreadyExist(username))
      errors.push('Username already in use');

    if (!this.validateEmail(email))
      errors.push('Email must be valid');

    return errors;
  }

  isCredentialNotLongEnough(creditental) {
    return creditental.length < 4;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  * isEmailAlreadyExist(email) {
    return (yield Database.from('users').where('email', email)).length > 0;
  }

  * isUsernameAlreadyExist(username) {
    return (yield Database.from('users').where('username', username)).length > 0;
  }

  * sendWelcomeMail(user){
    const root = yield User.findBy('id', 1);
    yield root.sendMessage(user, 'Welcome to RocketX', 'Hey,<br>I am happy to see you there.<br> RocketX is in alpha version, which means, you will encounter bugged or not working features. In this stage of development, I would like to hear ideas from you, so if you have some great ideas please share with us or if you want to help do not hesitate to contact us.<br>Bye,<br>Gergo');
   }
}

module.exports = UserController;
