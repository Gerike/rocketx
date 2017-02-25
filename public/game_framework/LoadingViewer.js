class LoadingViewer { //TODO: Using ingame HUDHandler to draw elements instead these functions, parameters to define loading text
  constructor(ctx) {
    this.ctx = ctx;
    this.loadedPromise = 0;
    this.allPromise = 0;
  }

  showProgressBarForPromises(promises) {
    this.loadedPromise = 0;
    this.allPromise = promises.length;
    this.setUpLoadingScreen();

    for (const promise of promises) {
      promise.then(() => {
        this.increaseLoaderBar();
      });
    }

    Promise.all(promises).then(() => {
      this.allReady();
    });
  }

  increaseLoaderBar(){
    this.loadedPromise++;
    this.updateLoaderBar();
  }

  setUpLoadingScreen() {
    this.ctx.font = "40px Georgia";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Loading in progress", framework.getConstants().CANVAS_WIDTH / 2 - 180, framework.getConstants().CANVAS_HEIGHT / 2 - 50);
    this.ctx.rect(framework.getConstants().CANVAS_WIDTH / 2 - 100, framework.getConstants().CANVAS_HEIGHT / 2 - 20, 200, 40);
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }

  updateLoaderBar() {
    this.ctx.fillRect(framework.getConstants().CANVAS_WIDTH / 2 - 100, framework.getConstants().CANVAS_HEIGHT / 2 - 20, 200 / this.allPromise * this.loadedPromise, 40);
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }

  allReady(){
    this.ctx.font = "20px Georgia";
    this.ctx.fillText("Press any key to continue...", framework.getConstants().CANVAS_WIDTH / 2 - 100, framework.getConstants().CANVAS_HEIGHT - 50);
  }

}
