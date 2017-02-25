/**
 * Created by Win10 on 2016. 12. 12..
 */
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  frame() {
  }

  draw(ctx) {
  }

  collided(object) {
  }
}
