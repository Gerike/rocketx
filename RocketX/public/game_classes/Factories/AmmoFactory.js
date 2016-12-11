class AmmoFactory {
  static createBaseAmmo(){
    return new BaseAmmo(10, resources['laser_2'], 5)
  }
  static createFreezingAmmo(){
    return new FreezingAmmo(10, resources['laser_3'], 5)
  }
}
