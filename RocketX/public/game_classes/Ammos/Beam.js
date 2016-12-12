class Beam extends Entity {
  constructor(damage, x, y, img, effect, uptime) { //TODO: COLLISION HANDLING ISNT WORKING CUZ IT CHECK THE IMG WIDTH NOT THE ACTUAL WIDTH OF THE DRAWN IMAGE => IT HITS EVERYTHING IN THE LASER'S PATH REGARDLESS THE LASER ONLY GOES FOR THE FIRST COLLISION
    super(x,y);
    this.damage = damage;
    this.img = img;
    this.effect = effect;
    this.hasDynamicMask = true;
    this.width = this.img.width;
    this.uptime = uptime;
    framework.delegateFrameEvent(() => {framework.requestDestroy(this)}, this.uptime);
  }

  draw(ctx, x = this.x, y = this.y) {
    ctx.drawImage(this.img, x, y, this.width, this.img.height);
  }

  frame() {
    this.width = framework.getFirstCollideEntity(this);
    this.x = framework.entities[0].x + 45; //TODO: REWORK PLS
    this.y = framework.entities[0].y + 10;
  }

  collided(object) {
    /*if (object.x - this.x < this.width)
      this.width = object.x - this.x + 1;*/
  }

  executeEffect(object){
    this.effect(object);
  }
}
