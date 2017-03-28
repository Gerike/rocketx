'use strict';

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
Route.get('/play', 'GameController.startGame').middleware('auth');
Route.get('/messages', 'MessageController.showMessages').middleware('auth');
Route.get('/messages/unread_count', 'MessageController.getUnreadMessageCount').middleware('auth');
Route.get('/logout', 'UserController.logout').middleware('auth');
Route.get('/messages/sent_messages', 'MessageController.getSentMessages').middleware('auth');
Route.get('/messages/received_messages', 'MessageController.getReceivedMessages').middleware('auth');
Route.post('/messages/mark_as_read', 'MessageController.markAsRead').middleware('auth');

