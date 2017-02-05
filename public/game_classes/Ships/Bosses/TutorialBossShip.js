class TutorialBossShip extends SpaceShip{
  constructor() {
    super(0, 0, 300, resources['tutorial_boss']);
    this.x = framework.constants.canvasWidth;
    this.y = framework.constants.canvasHeight / 2 - this.img.height/2;
    this.ai = new TutorialBossAI(this).initializeAI();

    this.weapons = [new NCannon(new BaseAmmo(3, resources['base_laser'], 3), 30, this, 6), new RepeatCannon(new BaseAmmo(3, resources['base_laser'], 6), 1, this, 15, 1)];
    for(const weapon of this.weapons){
      weapon.setDirection(270);
    }
  }

  frame() {
    this.ai.next().value();
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

  shoot(){
    for (weapon of this.weapons){
      weapon.shoot();
    }
  }
}
