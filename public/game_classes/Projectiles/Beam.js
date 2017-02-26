class Beam extends EntityWithImage {
  constructor(position, image, damage, effect, uptime, linkedEntity) {
    super(position, image);
    this.damage = damage;
    this.effect = effect;
    this.hasDynamicMask = true;
    this.width = this._image.width;
    this.uptime = uptime;
    this.linkedEntity = linkedEntity;
    TimeHandler.getInstance().delegateFrameEvent(() => {
      framework.requestDestroy(this);
    }, this.uptime);
  }

  draw(ctx, position = this.getPosition()) {
    ctx.drawImage(this._image, position.getX(), position.getY(), this.width, this._image.height);
  }

  frame() {
    let tempW = framework.getFirstCollideEntity(this);
    this.width = (tempW + 10 < this._image.width) ? tempW + 10 : this._image.width;
    this._position.setX(this.linkedEntity.getPosition().getX() + 45);
    this._position.setY(this.linkedEntity.getPosition().getY() + 10);
  }

  collided(object) {
    /*if (object.x - this.x < this.width)
     this.width = object.x - this.x + 1;*/
  }

  executeEffect(object) {
    this.effect(object);
  }
}
