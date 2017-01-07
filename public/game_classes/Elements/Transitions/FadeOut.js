class FadeOut {
  constructor(takingTime) {
    this.takingTime = takingTime;
    this.progress = 0;
    this.activated = false;
  }

  waitUntilExpiring(elementExpirationFrame) {
    framework.timer.delegateFrameEvent(() => {
      this.activate();
    }, elementExpirationFrame - this.takingTime - framework.timer.getCurrentFrameIndex())
  }

  activate() {
    this.activated = true;
    framework.drawer.render(true);
  }

  prepareContext(ctx) {
    framework.drawer.markElementsAsChanged();
    ctx.globalAlpha = 1 - 1 / this.takingTime * this.progress;
    this.progress++;
  }

  isDone() {
    return this.progress === this.takingTime;
  }
}
