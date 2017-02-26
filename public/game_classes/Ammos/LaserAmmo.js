class LaserAmmo extends Ammo {
  constructor(damage, image, uptime) {
    super(damage, image);
    this.uptime = uptime;
  }

  effect() {
    return (entity) => {
      entity.modifyHp(-this.damage);
    };
  }

  createProjectile(position, direction, linkedTo) {
    framework.registerEntity(new Beam(position, this._image, this.damage, this.effect(), this.uptime, linkedTo));
  }
}
