class ShootingPractice2 extends KillXLevel {
  constructor(framework) {
    super(framework, 'Shooting Practice 2', 6, 'Use the spacebar to shoot', resources['keyboard_space']);
  }

  practice() {
    framework.entityHandler.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));

    this.createEnemyShips(1, 60);
  }
}
