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
Route.get('/play', 'GameController.startGame').middleware('auth');
Route.get('/messages', 'UserController.showMessages').middleware('auth');
Route.get('/messages/new', 'UserController.newMessage').middleware('auth');
Route.post('/messages/new', 'UserController.createMessage').middleware('auth');
Route.post('message', 'UserController.getMessage').middleware('auth');
Route.post('messages', 'UserController.getMessageHeaders').middleware('auth');
Route.get('/rest/scores/:count', 'ToplistController.getTopScores');
Route.get('/logout', 'UserController.logout').middleware('auth');

