class WeaponFactory {
  static createWeapon(weapon_scheme, ammo_scheme){
    let weapon = new weapon_scheme[0](null, weapon_scheme[1], resources[weapon_scheme[2]]);
    if(ammo_scheme)
      weapon.ammo = AmmoFactory.createAmmo(ammo_scheme);
    return weapon;
  }
}

