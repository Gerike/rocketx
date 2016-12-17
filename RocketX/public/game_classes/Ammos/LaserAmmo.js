class LaserAmmo extends Ammo{
  constructor(damage, img, uptime){
    super(damage, img);
    this.uptime = uptime;
  }
  effect(){
    return (entity) => {
      entity.modifyHp(-this.damage);
    }
  }
  createProjectile(x, y, direction, linked_to) {
    framework.registerEntity(new Beam(this.damage, x, y, this.img, this.effect(), this.uptime, linked_to));
  }
}
