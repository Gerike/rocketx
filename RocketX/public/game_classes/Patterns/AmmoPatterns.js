/**
 * Created by Win10 on 2016. 12. 11..
 */
class AmmoPatterns{

  static createBaseAmmo(){
    return AmmoFactory.createBaseAmmo(10, resources['laser_2'], 5);
  }

  static createFreezingAmmo(){
    return AmmoFactory.createFreezingAmmo(5, resources['laser_3'], 5);
  }

  static createLaserAmmo(){
    return AmmoFactory.createLaserAmmo(50, resources['laser_4']);
  }
}
