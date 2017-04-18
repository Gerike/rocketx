class Shield extends EnergyField {
  constructor(damageAbsorbance, linkedTo, rechargeTime) {
    super(damageAbsorbance, linkedTo.getPosition(), linkedTo.getWidth(), linkedTo.getHeight(), rechargeTime);
    this.linkedEntity = linkedTo;
    framework.attachEntity(this, linkedTo);
  }

  draw(ctx, position = this.getPosition()) {
    if (this.hp > 0) {
      ctx.strokeStyle = "deepskyblue";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(position.getX() + this.getWidth() / 2, position.getY() + this.getHeight() / 2, this.getWidth() / 1.5, this.getHeight() / 1.5, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  getHeight() {
    return this.linkedEntity.getHeight();
  }

  getWidth() {
    return this.linkedEntity.getWidth();
  }

  getPosition() {
    return this.linkedEntity.getPosition();
  }
}
