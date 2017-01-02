class Beam extends Entity {
  constructor(damage, x, y, img, effect, uptime, linked_entity) {
    super(x,y);
    this.damage = damage;
    this.img = img;
    this.effect = effect;
    this.hasDynamicMask = true;
    this.width = this.img.width;
    this.uptime = uptime;
    this.linkedEntity = linked_entity;
    framework.delegateFrameEvent(() => {framework.requestDestroy(this)}, this.uptime);
  }

  draw(ctx, x = this.x, y = this.y) {
    ctx.drawImage(this.img, x, y, this.width, this.img.height);
  }

  frame() {
    this.width = framework.getFirstCollideEntity(this);
    this.x = this.linkedEntity.x + 45;
    this.y = this.linkedEntity.y + 10;
  }

  collided(object) {
    /*if (object.x - this.x < this.width)
      this.width = object.x - this.x + 1;*/
  }

  executeEffect(object){
    this.effect(object);
  }
}
