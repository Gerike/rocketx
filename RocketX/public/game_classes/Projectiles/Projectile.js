class Projectile extends Entity{
  constructor(damage, img, x, y, direction, speed, effect) {
    super(x,y);
    this.damage = damage;
    this.img = img;
    this.path = new LinearPath(x, y, direction, speed).getWaypoints()
    this.effect = effect;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame() {
    let next_waypoint = this.path.next().value;
    this.x = next_waypoint.x;
    this.y = next_waypoint.y;
  }

  collided(object) {
    framework.requestDestroy(this);
  }

  executeEffect(object){
    this.effect(object);
  }
}
