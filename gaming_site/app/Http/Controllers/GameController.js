/**
 * Created by Geri on 2016. 11. 13..
 */
'use strict'
class GameController{
  * startGame(request, response) {
    yield response.sendView('game')
  }
}
module.exports = GameController;
