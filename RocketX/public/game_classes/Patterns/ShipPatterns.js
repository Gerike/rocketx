class ShipPatterns{

  static createBasePlayerShip(x, y) {
    return ShipFactory.createBasePlayerShip(x, y, 100, resources['ship_2'], [WeaponPatterns.createLaserCannon()], [], 5);
  }
  static createBaseEnemyShip(x, y){
    return ShipFactory.createBaseEnemyShip(x, y, 10, resources['ship_3'], [], [], 2, new LinearPath(x, y, 270, 1));
  }
}
