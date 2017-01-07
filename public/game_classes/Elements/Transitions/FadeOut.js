class FadeOut {
  constructor(takingTime){
    this.takingTime = takingTime;
    this.progress = 0;
    this.activated = false;
  }

  activateOnStartingFrame(elementExpirationFrame){
    console.log(elementExpirationFrame - this.takingTime);
    framework.timer.delegateFrameEvent(()=> {this.activated = true; framework.drawer.render(true);}, elementExpirationFrame - this.takingTime - framework.timer.getCurrentFrameIndex())
  }

  prepareContext(ctx){
    framework.drawer.markElementsAsChanged();
    ctx.globalAlpha = 1 - 1 / this.takingTime * this.progress;
    this.progress++;
  }
}
