patterns.ships = {};

patterns.ships.types = {
  BASE_ENEMY_SHIP: BaseEnemyShip,
  PLAYER_SHIP: PlayerShip,
};

patterns.ships = {
  BASE_PLAYER_SHIP: {
    type: patterns.ships.types.PLAYER_SHIP,
    hp: 100,
    image: 'ship_2',
    speed: 5
  },
  BASE_ENEMY_SHIP: {
    type: patterns.ships.types.BASE_ENEMY_SHIP,
    hp: 30,
    image: 'ship_3',
    speed: 5
  },
};

