'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.post('/login', 'UserController.login');
Route.on('/').render('welcome');
Route.post('/register', 'UserController.register');
Route.get('/register', 'UserController.register');
Route.get('/play', 'GameController.startGame');
Route.get('/messages', 'UserController.showMessages');
Route.get('/messages/new', 'UserController.newMessage');
Route.post('message', 'UserController.getMessage');
Route.post('messages', 'UserController.getMessageHeaders');

