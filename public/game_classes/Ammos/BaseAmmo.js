class BaseAmmo extends Ammo {
  constructor(damage, image, speed) {
    super(damage, image);
    this.speed = speed;
  }

  effect() {
    return (entity) => {
      entity.modifyHp(-this.damage);
    };
  }

  createProjectile(position, direction) {
    framework.registerEntity(new Projectile(position, this._image, this.damage, this.effect(), direction, this.speed));
  }
}
