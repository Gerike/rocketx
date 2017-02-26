class Projectile extends EntityWithImage {
  constructor(damage, image, position, direction, speed, effect) {
    super(position, image);
    this.damage = damage;
    this.path = new LinearPath(position, direction, speed).getWaypoints();
    this.effect = effect;
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
