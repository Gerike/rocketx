/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class WeaponFactory {
  static createBaseCannon(ammo_type, firerate, ship_img) {
    return new BaseCannon(ammo_type, firerate, ship_img.width, ship_img.height);
  }
  static createTripleCannon(ammo_type, firerate, ship_img) {
    return new TripleCannon(ammo_type, firerate, ship_img.width, ship_img.height);
  }

  static createBeamCannon(ammo_type, firerate, ship_img){
    return new BeamCannon(ammo_type, firerate, ship_img.width, ship_img.height);
  }
}

