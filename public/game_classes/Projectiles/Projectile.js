class Projectile extends EntityWithImage {
  constructor(position, image, damage, effect, direction, speed) {
    super(position, image);
    this.damage = damage;
    this._path = new LinearPath(position, speed, direction).getWaypoints();
    this.effect = effect;
  }

  frame() {
    this._position = this._path.next().value;
  }

  collided(object) {
    framework.requestDestroy(this, 'Collided');
  }

  executeEffect(object) {
    this.effect(object);
  }
}
