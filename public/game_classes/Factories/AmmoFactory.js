class AmmoFactory {
  static createAmmo(ammoPattern) {
    let ammo = new ammoPattern.type();
    for (const key in ammoPattern) {
      if ((key !== 'type') && (key !== 'img'))
        ammo[key] = ammoPattern[key];
      else if (key === 'img')
        ammo[key] = framework.getResources()[ammoPattern[key]];
    }
    return ammo;
  }
}
