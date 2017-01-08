class ShootingPractice4 extends KillXLevel {
  constructor(framework) {
    super(framework, 'Shooting Practice 4', 15, 'Press Q to change weapon');
  }

  practice() {
    framework.entityHandler.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON, patterns.weapons.TRIPLE_CANNON, patterns.weapons.TRIPLE_CANNON], [patterns.ammos.BASE_AMMO, patterns.ammos.BASE_AMMO, patterns.ammos.FREEZING_AMMO]));
    this.createEnemyShips(3, 60);
  }
}
