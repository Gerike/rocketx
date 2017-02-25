class BaseCannon extends Cannon {
  constructor(ammo, firerate, linkedEntity) {
    super(ammo, linkedEntity);
    this.firerate = firerate;
  }

  _shoot(direction) {
    let projectilePosition = new Position(
      this.linkedEntity.getPosition().getX() + this.linkedEntity.img.width / 2 + Math.sin(direction * Math.PI / 180) * this.linkedEntity.img.width / 2 - 5,
      this.linkedEntity.getPosition().getY() + this.linkedEntity.img.height / 2 + Math.cos(direction * Math.PI / 180) * this.linkedEntity.img.height / 2 * -1);
    this.ammo.createProjectile(projectilePosition, direction);
  }
}
