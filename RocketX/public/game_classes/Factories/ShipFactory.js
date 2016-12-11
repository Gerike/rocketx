/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class ShipFactory {
  static createBasePlayerShip(x, y, hp, ship_img, weapons, extras, speed) {
    return new PlayerShip(x, y, hp, ship_img, weapons, extras, speed);
  }
  static createBaseEnemyShip(x,y, hp, ship_img, weapons, extras, speed, path){
    return new BaseEnemyShip(x, y, hp, ship_img, weapons, extras, speed, path);
  }
}

