class Beam {
  constructor(damage, x, y, img, effect) {
    this.damage = damage;
    this.img = img;
    this.x = x;
    this.y = y;
    this.effect = effect;
    framework.delegateFrameEvent(() => {framework.requestDestroy(this)}, 2);
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame() {
  }

  collided(object) {
  }

  executeEffect(object){
    this.effect(object);
  }
}
