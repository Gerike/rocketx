class FadeOut {
  constructor(length) {
    this.length = length;
    this.progress = 0;
    this.activated = false;
  }

  waitUntilExpiring(elementExpirationFrame) {
    let timer = TimeHandler.getInstance();
    timer.delegateFrameEvent(() => {
      this.activate();
    }, elementExpirationFrame - this.length - timer.getCurrentFrameIndex())
  }

  activate() {
    this.activated = true;
    HUDHandler.getInstance().render(true);
  }

  prepareContext(ctx) {
    HUDHandler.getInstance().markElementsAsChanged();
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
