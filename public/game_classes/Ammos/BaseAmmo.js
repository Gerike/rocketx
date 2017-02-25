class BaseAmmo extends Ammo {
  constructor(damage, img, speed) {
    super(damage, img);
    this.speed = speed;
  }

  effect() {
    return (entity) => {
      entity.modifyHp(-this.damage);
    };
  }

  createProjectile(x, y, direction) {
    framework.registerEntity(new Projectile(this.damage, this.img, x, y, direction, this.speed, this.effect()));
  }
}
