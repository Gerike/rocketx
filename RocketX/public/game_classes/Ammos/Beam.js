class Beam {
  constructor(damage, x, y, img, effect) { //TODO: COLLISION HANDLING ISNT WORKING CUZ IT CHECK THE IMG WIDTH NOT THE ACTUAL WIDTH OF THE DRAWN IMAGE => IT HITS EVERYTHING IN THE LASER'S PATH REGARDLESS THE LASER ONLY GOES FOR THE FIRST COLLISION
    this.damage = damage;
    this.img = img;
    this.x = x;
    this.y = y;
    this.effect = effect;
    this.width = framework.getFirstCollideEntity(this);
    framework.delegateFrameEvent(() => {framework.requestDestroy(this)}, 60);
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.img.height);
  }

  frame() {
    this.width = framework.getFirstCollideEntity(this);
    this.x = framework.entities[0].x + 45; //TODO: REWORK PLS
    this.y = framework.entities[0].y + 10;
  }

  collided(object) {
    if (object.x - this.x < this.width)
      this.width = object.x - this.x;
  }

  executeEffect(object){
    this.effect(object);
  }
}
