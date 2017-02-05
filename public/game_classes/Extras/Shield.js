class Shield extends Entity{
  constructor(damageAbsorbance, rechargeTime, linkedEntity, img) {
    super(linkedEntity.getX(), linkedEntity.getY());
    this.maxDamageAbsorbance = damageAbsorbance;
    this.currentAbsorbance = damageAbsorbance;
    this.rechargeTime = rechargeTime;
    this.linkedEntity = linkedEntity;
    this.img = img;
    this.hasDynamicMask = true;
    this.offset = 10;
  }

  draw(ctx, x = this.getX(), y = this.getY()) {
    if (!this.isRecharging())
      ctx.drawImage(this.img, x, y, this.linkedEntity.img.width+this.offset*2, this.linkedEntity.img.height+this.offset*2);
  }

  collided(object) {
    object.executeEffect(this);
    if (this.currentAbsorbance <= 0) {
      this.startRecharge();
    }
  }

  modifyHp(modifier) {
    this.currentAbsorbance += modifier;
  }

  isRecharging() {
    return this.currentAbsorbance <= 0;
  }

  startRecharge() {
    framework.timer.delegateFrameEvent(() => {
      this.currentAbsorbance = this.maxDamageAbsorbance
    }, this.rechargeTime);
  }

  getX(){
    return this.linkedEntity.getX()-this.offset;
  }
  getY(){
    return this.linkedEntity.getY()-this.offset;
  }

}
