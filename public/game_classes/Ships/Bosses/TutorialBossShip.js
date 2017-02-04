class TutorialBossShip extends BaseEnemyShip {
  constructor() {
    super(framework.constants.canvasWidth, framework.constants.canvasHeight / 2, 300, resources['tutorial_boss'], [], []);
    this.ai = new TutorialBossAI(this).planMoves();
  }

  frame() {
    this.ai.next()
  }

  collided(object) {
    object.executeEffect(this);
    if (this.hp <= 0)
      this.destroy();
  }

  destroy() {
    framework.requestDestroy(this);
  }

  setSpeed(speed) {
    //Boss ships can't be slowed down
  }

  setTemporarySpeed(speed, frame) {
    //Boss ships can't be slowed down
  }
}
