class FadeIn {
  constructor(length) {
    this.length = length;
    this.progress = 0;
  }

  isDone() {
    return this.progress === this.takingTime;
  }

  prepareContext(ctx) {
    HUDHandler.getInstance().markElementsAsChanged();
    ctx.globalAlpha = 1 / this.length * this.progress;
    this.progress++;
  }

  getLength() {
    return this.length;
  }
}
