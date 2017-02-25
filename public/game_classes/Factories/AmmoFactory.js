class AmmoFactory {
  static createAmmo(ammo_pattern) {
    let ammo = new ammo_pattern['type'];
    for (const key in ammo_pattern) {
      if ((key !== 'type') && (key !== 'img'))
        ammo[key] = ammo_pattern[key];
      else if (key === 'img')
        ammo[key] = framework.getResources()[ammo_pattern[key]];
    }
    return ammo;
  }
}
