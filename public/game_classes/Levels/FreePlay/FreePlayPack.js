class FreePlayPack{
  constructor(){
    this.name = "Free Play";
    this.neededResources = ['/assets/laser_4.png', '/assets/ship.png', '/assets/base_laser.png', '/assets/laser_2.png', '/assets/ship_2.png', 'assets/ship_3.png', '/assets/laser_3.png', '/assets/keyboard_arrows.png', '/assets/keyboard_space.png'];
  }

  getName() {
    return this.name;
  }

  start() { //TODO: MAKE IT LAZY LOAD
    this.stages = [new FreePlay(this)];
    this.currentStage = 0;
    this.stages[0].start();
  }

  resetFramework() {
    framework.resetFramework();
  }

  nextStage() {
    this.resetFramework();
    this.stages[this.currentStage].start();
  }
}
