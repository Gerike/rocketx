class MovingPractice extends Level {
  constructor(framework) {
    super(framework, 'Moving Practice', 10, 'Move around a bit', 'Moved: ', 'Use the arrow buttons to move your ship', resources['keyboard_arrows']);
  }

  isPlayerMoving() {
    return (framework.isDown(37) || framework.isDown(38) || framework.isDown(39) || framework.isDown(40))
  }

  checkRecursively() {
    if (this.isPlayerMoving() && !this.waiting) {
      this.increaseObjectiveCounter();
    }
    framework.delegateFrameEvent(() => {
      this.checkRecursively();
    }, 60);

  }

  practice() {
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [], []));
    this.checkRecursively();
  }
}
