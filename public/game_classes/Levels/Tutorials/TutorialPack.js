class TutorialPack {
  constructor(framework) {
    this.name = "Tutorial level pack";
    this.framework = framework;
    this.framework.setup(canvasHeight, canvasWidth, canvas, special_message_canvas);
    this.framework.setUpEventHandlers();
    this.framework.createStaticMasks(resources);
    this.gameThread = window.requestAnimationFrame(step);
  }

  getName() {
    return this.name;
  }

  start() {
    this.stages = [new MovingPractice(this.framework), new ShootingPractice1(this.framework), new ShootingPractice2(this.framework), new ShootingPractice3(this.framework), new ShootingPractice4(this.framework), new ShootingPractice5(this.framework)];
    this.currentStage = 0;
    this.stages[0].start();
  }

  resetFramework() {
    framework.entities = [];
    framework.elements = [];
    framework.frameEvents = [];
    framework.entityHandler.eventSubscribers = {};
  }

  nextStage() {
    this.currentStage++;
    this.resetFramework();
    if (this.currentStage < this.stages.length)
      this.stages[this.currentStage].start();
    else
      this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "You completed all of the trainings", new TextStyle("50px Gerogia"), new FadeIn(50), new FadeOut(50)));
  }
}