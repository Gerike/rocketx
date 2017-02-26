class FreePlay extends Level {
  constructor(levelPack) {
    super(levelPack, 'Free Play', 0, 'Free play', '', '');
  }

  practice() {
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [], []));
  }
}
