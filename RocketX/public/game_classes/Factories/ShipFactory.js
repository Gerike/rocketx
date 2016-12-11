/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class ShipFactory {
  static createBasePlayerShip(x, y) {
    return new PlayerShip(x, y, 10, resources['ship_2'], [WeaponFactory.createBaseCannon(resources['ship_2'])], [], 4);
  }
  static createBaseEnemyShip(x,y, path){
    return new BaseEnemyShip(x, y, 10, resources['ship_3'], [], [], 2, path);
  }
}

