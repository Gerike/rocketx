class Projectile {
  constructor(damage, img, x, y, direction, speed) {
    this.damage = damage;
    this.img = img;
    this.x = x;
    this.y = y;
    this.path = new LinearPath(x, y, direction, speed).getWaypoints()
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
}
