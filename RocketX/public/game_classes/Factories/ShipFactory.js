/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class ShipFactory {
  static createBasePlayerShip(x, y) {
    return new PlayerShip(x, y, resources['ship_2'], [WeaponFactory.createBaseCannon(resources['ship_2'])], [], 4);
  }
  static createBaseEnemyShip(x,y, direction){
    return new BaseEnemyShip(x, y, resources['ship'], [], [], 2, new LinearPath(x, y, direction, 1));
  }
}

