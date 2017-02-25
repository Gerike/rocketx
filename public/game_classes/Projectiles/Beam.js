class Beam extends Entity {
  constructor(damage, position, img, effect, uptime, linkedEntity) {
    super(position);
    this.damage = damage;
    this.img = img;
    this.effect = effect;
    this.hasDynamicMask = true;
    this.width = this.img.width;
    this.uptime = uptime;
    this.linkedEntity = linkedEntity;
    TimeHandler.getInstance().delegateFrameEvent(() => {
      framework.requestDestroy(this);
    }, this.uptime);
  }

  draw(ctx, position = this.getPosition()) {
    ctx.drawImage(this.img, position.getX(), position.getY(), this.width, this.img.height);
  }

  frame() {
    let tempW = framework.getFirstCollideEntity(this);
    this.width = (tempW + 10 < this.img.width) ? tempW + 10 : this.img.width;
    this.position.setX(this.linkedEntity.getPosition().getX() + 45);
    this.position.setY(this.linkedEntity.getPosition().getY() + 10);
  }

  collided(object) {
    /*if (object.x - this.x < this.width)
     this.width = object.x - this.x + 1;*/
  }

  executeEffect(object) {
    this.effect(object);
  }
}
