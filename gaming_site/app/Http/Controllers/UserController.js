'use strict'
const Database = use('Database')
const Hash = use('Hash')

class UserController {

  * login (request, response) {
    const email = request.input('email');
    const password = request.input('password');
    try {
      const login = yield request.auth.attempt(email, password);
      response.redirect('/');
    }
    catch (e) {
      console.log(e)
      response.unauthorized('Invalid credentails');
    }
  }
  *register (request, response){
    if (request.method() === "POST") {
      const email = request.input('email');
      const password = request.input('password');
      const username = request.input('username');
      let errors = [];
      if ((password.length < 4 ) || (username.length < 4)) {
        errors.push('Username and password must be at least 4 characters')
      }
      if ((yield Database.from('users').where('email', email)).length > 0) {
        errors.push('Already registered with this email')
      }
      if ((yield Database.from('users').where('username', username)).length > 0) {
        errors.push('Username already in use')
      }
      if (errors.length === 0) {
        const user = yield Database.insert({username: username, email: email, password: yield Hash.make(password)}).into('users');
        const login = yield request.auth.attempt(email, password);
        response.redirect('/');
      }
      else {
        yield response.sendView('register', {errors});
      }

    }
    else {
      yield response.sendView('register')
    }

  }
}

module.exports = UserController;
