class ShootingPractice3 extends KillXLevel {
  constructor(framework) {
    super(framework, 'Shooting Practice 3', 10, 'Press Q to change weapon');
  }

  practice() {
    framework.entityHandler.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON, patterns.weapons.TRIPLE_CANNON], [patterns.ammos.BASE_AMMO, patterns.ammos.BASE_AMMO]));

    this.createEnemyShips(2, 60);
  }
}
