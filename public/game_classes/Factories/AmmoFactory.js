class AmmoFactory {
  static createAmmo(ammoPattern) {
    let ammo = new ammoPattern.type();
    for (const key in ammoPattern) {
      if ((key !== 'type') && (key !== 'image'))
        ammo[key] = ammoPattern[key];
      else if (key === 'image')
        ammo._image = framework.getResources()[ammoPattern[key]];
    }
    return ammo;
  }
}
