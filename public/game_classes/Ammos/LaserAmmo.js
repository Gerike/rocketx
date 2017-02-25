class LaserAmmo extends Ammo {
  constructor(damage, img, uptime) {
    super(damage, img);
    this.uptime = uptime;
  }

  effect() {
    return (entity) => {
      entity.modifyHp(-this.damage);
    };
  }

  createProjectile(position, direction, linkedTo) {
    framework.registerEntity(new Beam(this.damage, position, this.img, this.effect(), this.uptime, linkedTo));
  }
}
