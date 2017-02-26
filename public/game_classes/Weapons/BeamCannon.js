class BeamCannon extends Cannon {
  constructor(ammo, firerate, linkedEntity) {
    super(ammo, firerate, linkedEntity);
  }

  _shoot() {
    let projectilePosition = new Position(
      this.linkedEntity.getPosition().getX() + this.linkedEntity.getImage().width / 2 + Math.sin(this.direction * Math.PI / 180) * this.linkedEntity.getImage().width / 2 - 5,
      this.linkedEntity.getPosition().getY() + this.linkedEntity.getImage().height / 2 + Math.cos(this.direction * Math.PI / 180) * this.linkedEntity.getImage().height / 2 * -1);
    this.ammo.createProjectile(projectilePosition, this.direction, this.linkedEntity);
  }
}
