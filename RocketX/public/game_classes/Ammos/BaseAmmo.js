/**
 * Created by Geri on 2016. 11. 14..
 */
class BaseAmmo {
  constructor(damage, img, speed) {
    this.damage = damage;
    this.img = img;
    this.speed = speed;
  }

  effect(){
    return (entity) => {entity.modifyHp(-this.damage)}
  }

  createProjectile(x, y, direction) {
    framework.registerEntity(new Projectile(this.damage, this.img, x, y, direction, this.speed, this.effect()));
  }
}
