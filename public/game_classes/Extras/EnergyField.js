class EnergyField extends Entity {
  constructor(damageAbsorbance, position, width, height, rechargeTime) {
    super(position);
    this.width = width;
    this.height = height;
    this.maxDamageAbsorbance = damageAbsorbance;
    this.hp = damageAbsorbance;
    this.rechargeTime = rechargeTime;
    this.hasDynamicMask = true;
  }

  draw(ctx, position = this.getPosition()) {
    if (this.hp > 0) {
      ctx.fillStyle = "deepskyblue";
      ctx.fillRect(position.getX(), position.getY(), this.width, this.height);
    }
  }

  collided(object) {
    object.executeEffect(this);
    if (this.hp <= 0)
      this.doRecharge();
  }

  modifyHp(hp) {
    this.hp += hp;
  }

  doRecharge() {
    if (this.rechargeTime)
      TimeHandler.getInstance().delegateFrameEvent(() => {
        this.hp = this.maxDamageAbsorbance;
      }, this.rechargeTime);
    else
      framework.requestDestroy(this, 'Killed');
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  executeEffect(object) {
    object.modifyHp(-50);
  }
}
