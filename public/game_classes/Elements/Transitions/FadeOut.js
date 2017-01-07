class FadeOut {
  constructor(takingTime, expiryTime){
    this.takingTime = takingTime;
    this.progress = 0;
  }

  hasToRun(elementExpirationFrame){
    if (elementExpirationFrame - framework.timer.getCurrentFrameIndex() - this.takingTime <= 0){
      framework.drawer.markElementsAsChanged();
      return true;
    }
    return false;
  }

  prepareContext(ctx){
    framework.drawer.markElementsAsChanged();
    ctx.globalAlpha = 1 - 1 / this.takingTime * this.progress;
    this.progress++;
  }
}
