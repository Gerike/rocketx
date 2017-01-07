class FadeOut {
  constructor(length) {
    this.length = length;
    this.progress = 0;
    this.activated = false;
  }

  waitUntilExpiring(elementExpirationFrame) {
    framework.timer.delegateFrameEvent(() => {
      this.activate();
    }, elementExpirationFrame - this.length - framework.timer.getCurrentFrameIndex())
  }

  activate() {
    this.activated = true;
    framework.drawer.render(true);
  }

  prepareContext(ctx) {
    framework.drawer.markElementsAsChanged();
    ctx.globalAlpha = 1 - 1 / this.length * this.progress;
    this.progress++;
  }

  isDone() {
    return this.progress === this.length;
  }

  getLength() {
    return this.length;
  }
}
