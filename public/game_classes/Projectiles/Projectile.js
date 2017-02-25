class Projectile extends Entity {
  constructor(damage, img, position, direction, speed, effect) {
    super(position);
    this.damage = damage;
    this.img = img;
    this.path = new LinearPath(position, direction, speed).getWaypoints();
    this.effect = effect;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.getPosition().getX(), this.getPosition().getY());
  }

  frame() {
   this.position = this.path.next().value;
  }

  collided(object) {
    framework.requestDestroy(this, 'Collided');
  }

  executeEffect(object) {
    this.effect(object);
  }
}
