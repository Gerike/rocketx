class BeamCannon extends Cannon {
  constructor(ammo, firerate, linkedEntity) {
    super(ammo, linkedEntity);
    this.firerate = firerate;
  }

  _shoot() {
    let projectileX = this.linkedEntity.x + this.linkedEntity.img.width / 2 + Math.sin(this.direction * Math.PI / 180) * this.linkedEntity.img.width / 2 - 5;
    let projectileY = this.linkedEntity.y + this.linkedEntity.img.height / 2 + Math.cos(this.direction * Math.PI / 180) * this.linkedEntity.img.height / 2 * -1;
    this.ammo.createProjectile(projectileX, projectileY, this.direction, this.linkedEntity);
  }
}
