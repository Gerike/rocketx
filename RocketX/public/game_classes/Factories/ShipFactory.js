class ShipFactory {
  static createShip(x, y, ship_pattern, weapon_patterns, ammo_patterns){
    let ship = new ship_pattern[0](x, y, ship_pattern[1], resources[ship_pattern[2]], ship_pattern[3], ship_pattern[4], ship_pattern[5], ship_pattern[6], ship_pattern[7]);
    if (weapon_patterns)
      for (let i = 0; i < weapon_patterns.length; i++)
        ship.weapons.push(WeaponFactory.createWeapon(weapon_patterns[i], ammo_patterns[i]));
    return ship;
  }
}

