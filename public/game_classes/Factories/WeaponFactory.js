class WeaponFactory {
  static createWeapon(weaponPattern, ammoPattern) {
    let weapon = new weaponPattern.type();
    for (const key in weaponPattern) {
      if (key !== 'type')
        weapon[key] = weaponPattern[key];
    }
    if (ammoPattern)
      weapon.ammo = AmmoFactory.createAmmo(ammoPattern);
    return weapon;
  }
}

