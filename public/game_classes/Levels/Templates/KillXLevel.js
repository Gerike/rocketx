class KillXLevel extends Level {
  constructor(framework, levelName, killCount, help, weaponHud) {
    super(framework, levelName, killCount, 'Kill all enemies before they escape', 'Killed: ', help, weaponHud);
  }

  createEnemyShip(speed = 0, x = 800, y = Math.random() * 300, path = true) {
    let ship = framework.registerEntity(ShipFactory.createShip(x, y, patterns.ships.BASE_ENEMY_SHIP));
    if (path) {
      let lp = new LinearPath(ship.x, ship.y, 270, speed);
      ship.setPath(lp);
    }
    return ship;
  }

  createEnemyShips(speed, frequency) {
    for (let i = 0; i < this.objectiveToComplete; i++)
      framework.timer.delegateFrameEvent(() => {
        this.createEnemyShip(speed);
      }, (i + 1) * frequency);
  }

  notify(entity) {
    if (entity.constructor.name === "BaseEnemyShip") {
      if (!framework.entityHandler.outOfCanvas(entity))
        this.increaseObjectiveCounter();
      else {
        this.failed(this.strings.objectiveFailed);
      }
    }
    else if (entity.constructor.name === "PlayerShip") {
      this.failed(this.strings.playerDied);
    }
  }
}
