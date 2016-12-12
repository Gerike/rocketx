class AmmoFactory {
  static createAmmo(pattern){
    return new pattern[0](pattern[1], resources[pattern[2]], pattern[3]);
  }
}
