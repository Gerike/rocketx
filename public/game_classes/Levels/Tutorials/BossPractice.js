class BossPractice extends KillXLevel {
  constructor(framework) {
    super(framework, 'BOSS', 1, '');
    this.objective = '';
  }

  practice() {
    framework.entityHandler.addEventListener("destroy", this);
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));
    framework.registerEntity(new TutorialBossShip());
  }
}
