class KillXLevel extends Level {
  constructor(levelPack, levelName, killCount, help, weaponHud) {
    super(levelPack, levelName, killCount, 'Kill all enemies before they escape', 'Killed: ', help, weaponHud);
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
      this.timer.delegateFrameEvent(() => {
        this.createEnemyShip(speed);
      }, (i + 1) * frequency);
  }

  notify(entity, event, reason) {
    if (entity.constructor.name === 'BaseEnemyShip' && event === 'destroy' ) {
      switch(reason){
        case 'Out of bounds' : this.failed(this.strings.objectiveFailed); break;
        case 'Killed' : this.increaseObjectiveCounter(); break;
      }
    }
    else if (entity.constructor.name === 'PlayerShip' && event === 'destroy')  {
      this.failed(this.strings.playerDied);
    }
  }
}
