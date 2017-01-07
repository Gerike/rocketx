class FadeIn {
  constructor(takingTime){
      this.takingTime = takingTime;
      this.progress = 0;
  }

  isDone(){
    return this.progress === this.takingTime;
  }

  prepareContext(ctx){
    framework.drawer.markElementsAsChanged();
    ctx.globalAlpha = 1 / this.takingTime * this.progress;
    this.progress++;
  }
}
