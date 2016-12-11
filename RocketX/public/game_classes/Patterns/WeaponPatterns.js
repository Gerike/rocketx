/**
 * Created by Win10 on 2016. 12. 11..
 */
class WeaponPatterns{
  static createBaseCannon() {
    return WeaponFactory.createBaseCannon(AmmoPatterns.createBaseAmmo(), 30, resources['ship_2']);
  }
  static createTripleCannon() {
    return WeaponFactory.createTripleCannon(AmmoPatterns.createBaseAmmo(), 30, resources['ship_2']);
  }
  static createFreezeCannon() {
    return WeaponFactory.createBaseCannon(AmmoPatterns.createFreezingAmmo(), 30, resources['ship_2']);
  }
  static createLaserCannon(){
    return WeaponFactory.createBeamCannon(AmmoPatterns.createLaserAmmo(), 300, resources['ship_2']);
  }
}
