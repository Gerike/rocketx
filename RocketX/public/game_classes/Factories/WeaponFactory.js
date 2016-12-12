class WeaponFactory {
  static createWeapon(weapon_pattern, ammo_pattern) {
    let weapon = new weapon_pattern['type'];
    for (const key in weapon_pattern) {
      if ((key !== 'type') && (key !== 'ship_img'))
        weapon[key] = weapon_pattern[key];
      else if (key === 'ship_img') {
        weapon['ship_width'] = resources[weapon_pattern[key]].width;
        weapon['ship_height'] = resources[weapon_pattern[key]].height;
      }
    }
    if (ammo_pattern)
      weapon.ammo = AmmoFactory.createAmmo(ammo_pattern);
    return weapon;
  }
}

