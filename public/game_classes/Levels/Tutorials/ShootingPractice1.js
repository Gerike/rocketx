class ShootingPractice1 extends KillXLevel {
  constructor(levelPack) {
    super(levelPack, 'Shooting Practice 1', 1, 'Use the spacebar to shoot', framework.getResources()['keyboard_space']);
  }

  practice() {
    framework.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));

    this.createEnemyShip(0, 600, 100, false);
    this.createEnemyShip(0, 400, 200, false);
    this.createEnemyShip(0, 600, 300, false);
  }
}
