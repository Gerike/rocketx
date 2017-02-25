class TutorialPack {
  constructor(framework) {
    this.name = "Tutorial level pack";
    this.neededResources = ['/assets/laser_4.png', '/assets/ship.png', '/assets/base_laser.png', '/assets/laser_2.png', '/assets/ship_2.png', 'assets/ship_3.png', '/assets/laser_3.png', '/assets/keyboard_arrows.png', '/assets/keyboard_space.png'];
  }

  getName() {
    return this.name;
  }

  start() { //TODO: MAKE IT LAZY LOAD
    this.stages = [new MovingPractice(this), new ShootingPractice1(this), new ShootingPractice2(this), new ShootingPractice3(this), new ShootingPractice4(this), new ShootingPractice5(this)];
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
