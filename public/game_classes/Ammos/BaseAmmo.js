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
    framework.registerEntity(new Projectile(this.damage, this.image, position, direction, this.speed, this.effect()));
  }
}
