/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class WeaponFactory {
  static createBaseCannon(ship_img) {
    return new BaseCannon(AmmoFactory.createFreezingAmmo(), 30, ship_img.width, ship_img.height);
  }
  static createTripleCannon(ship_img) {
    return new TripleCannon(AmmoFactory.createBaseAmmo(), 30, ship_img.width, ship_img.height);
  }
}

