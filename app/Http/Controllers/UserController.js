'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Message = use('App/Model/Message')
const User = use('App/Model/User')

class UserController {

   validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  * logout (request, response){
      yield request.auth.logout();
      response.redirect('/');
  }
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
  * register (request, response){
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
      if (!this.validateEmail(email))
        errors.push('Email must be valid');
      if (errors.length === 0) {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = yield Hash.make(password);
        yield user.save();
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

  * newMessage (request, response){
      yield response.sendView('new_message')
  }

  * showMessages (request, response){
    yield response.sendView('messages')
  }
  * getMessageHeaders(request, response){
    var messages = []
      if (request.post()['type'] ==='in')
        messages = yield Message.query().where('recipient_id', request.currentUser.id).fetch();
      else
        messages = yield Message.query().where('sender_id', request.currentUser.id).fetch();
      var resp = []
      for(let message of messages){
        resp.push({
          'title': message.title,
          'id': message.id,
          'sender': (yield User.find(message.sender_id)).attributes['username'],
          'recipient': (yield User.find(message.recipient_id)).attributes['username'],
          'sent': message.created_at
        })
      }
      return response.send(JSON.stringify(resp))

  }
  *getMessage(request, response){
      const message_id = request.post()['id'];
      const message = yield Message.findOrFail(message_id);
      if ((message.sender_id === request.currentUser.id) || (message.recipient_id === request.currentUser.id)){
        return response.send(message.content)
      }
  }

  *createMessage(request, response){
    const message = new Message();
    message.content = request.post()['content'];
    message.recipient_id = (yield User.findBy('username', request.post()['recipient'])).attributes['id'];
    message.sender_id = request.currentUser.id;
    message.title = request.post()['title'];
    yield message.save();
    response.redirect('/')
  }
}

module.exports = UserController;
