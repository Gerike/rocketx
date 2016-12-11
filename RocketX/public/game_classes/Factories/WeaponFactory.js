/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class WeaponFactory {
  static createBaseCannon(ship_img) {
    return new BaseCannon(new BaseAmmo(1, resources['laser_2'], 5), 30, ship_img.width, ship_img.height);
  }
  static createTripleCannon(ship_img) {
    return new TripleCannon(new BaseAmmo(1, resources['laser_2'], 5), 30, ship_img.width, ship_img.height);
  }
}

