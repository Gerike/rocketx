class BeamCannon extends Cannon{
  constructor(ammo, firerate, linked_entity) {
    super(ammo, linked_entity);
    this.firerate = firerate;
  }

  _shoot(){
    let projectile_x = this.linked_entity.x + this.linked_entity.img.width/2 + Math.sin(this.direction * Math.PI / 180) * this.linked_entity.img.width/2 - 5;
    let projectile_y = this.linked_entity.y + this.linked_entity.img.height/2 + Math.cos(this.direction * Math.PI / 180) * this.linked_entity.img.height/2 * - 1;
    this.ammo.createProjectile(projectile_x, projectile_y, this.direction, this.linked_entity);
  }
}
