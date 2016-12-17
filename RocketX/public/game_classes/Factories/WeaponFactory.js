class WeaponFactory {
  static createWeapon(weapon_pattern, ammo_pattern) {
    let weapon = new weapon_pattern['type'];
    for (const key in weapon_pattern) {
      if (key !== 'type')
        weapon[key] = weapon_pattern[key];
    }
    if (ammo_pattern)
      weapon.ammo = AmmoFactory.createAmmo(ammo_pattern);
    return weapon;
  }
}

