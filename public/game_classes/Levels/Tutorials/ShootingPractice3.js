class ShootingPractice3 extends KillXLevel {
  constructor(levelPack) {
    super(levelPack, 'Shooting Practice 3', 10, 'Press Q to change weapon');
  }

  practice() {
    framework.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON, patterns.weapons.TRIPLE_CANNON], [patterns.ammos.BASE_AMMO, patterns.ammos.BASE_AMMO]));

    this.createEnemyShips(2, 60);
  }
}
