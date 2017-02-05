class BaseCannon extends Cannon{
  constructor(ammo, firerate, linked_entity) {
    super(ammo, linked_entity);
    this.firerate = firerate;
  }

  _shoot(direction) {
    let projectile_x = this.linked_entity.x + this.linked_entity.img.width / 2 + Math.sin(direction * Math.PI / 180) * this.linked_entity.img.width / 1.7;
    let projectile_y = this.linked_entity.y + this.linked_entity.img.height / 2 + Math.cos(direction * Math.PI / 180) * this.linked_entity.img.height / 1.4 * -1;
    this.ammo.createProjectile(projectile_x, projectile_y, direction);
  }
}
