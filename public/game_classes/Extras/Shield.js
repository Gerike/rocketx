class Shield {
  constructor(damageAbsorbance, rechargeTime, linkedEntity) {
    this.maxDamageAbsorbance = damageAbsorbance;
    this.currentAbsorbance = damageAbsorbance;
    this.rechargeTime = rechargeTime;
    this.linkedEntity = linkedEntity;
  }

  draw(ctx) {
    if (!this.isRecharging())
      ctx.ellipse(this.linkedEntity.x + this.linkedEntity.img.width / 2, this.linkedEntity.y + this.linkedEntity.img.height / 2, this.linkedEntity.img.width + 20, this.linkedEntity.img.height + 20, 0, 0, 2 * Math.PI);
  }

  collided(obj) {
    obj.executeEffect(this);
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
}
