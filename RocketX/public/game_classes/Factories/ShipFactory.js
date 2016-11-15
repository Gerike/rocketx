/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class ShipFactory {
  static createBasePlayerShip(x, y) {
    return new PlayerShip(x, y, resources['ship'], [WeaponFactory.createBaseCannon(resources['ship'])], [], 4);
  }
  static createBaseEnemyShip(x,y){
    return new BaseEnemyShip(x, y, resources['ship'], [], [], 2, new LinearPath(x, y, 270));
  }
}

