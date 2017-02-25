class ShipFactory {
  static createShip(x, y, ship_pattern, weapon_patterns, ammo_patterns) {
    let ship = new ship_pattern['type'];

    ship.weapons = [];
    ship.x = x;
    ship.y = y;

    for (const key in ship_pattern) {
      if ((key !== 'type') && (key !== 'img'))
        ship[key] = ship_pattern[key];
      else if (key === 'img')
        ship[key] = framework.getResources()[ship_pattern[key]];
    }

    if (weapon_patterns)
      for (let i = 0; i < weapon_patterns.length; i++)
        ship.addWeapon(WeaponFactory.createWeapon(weapon_patterns[i], ammo_patterns[i]));
    return ship;
  }
}

