class AmmoFactory {
  static createBaseAmmo(damage, img, speed){
    return new BaseAmmo(damage, img, speed)
  }

  static createFreezingAmmo(damage, img, speed){
    return new FreezingAmmo(damage, img, speed)
  }

  static createLaserAmmo(damage, img){
    return new LaserAmmo(damage, img)
  }
}
