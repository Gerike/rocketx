class ShootingPractice5 extends KillXLevel {
  constructor(levelPack) {
    super(levelPack, 'Shooting Practice 5', 15, 'Press Q to change weapon');
  }

  practice() {
    framework.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BEAM_CANNON], [patterns.ammos.BASE_LASER_AMMO]));
    this.createEnemyShips(2, 60);
  }
}
