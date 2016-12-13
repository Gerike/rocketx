patterns.ships = {}

patterns.ships.types = {
  BASE_ENEMY_SHIP: BaseEnemyShip,
  PLAYER_SHIP: PlayerShip,
};

patterns.ships = {
  BASE_PLAYER_SHIP: {
    type: patterns.ships.types.PLAYER_SHIP,
    hp: 100,
    img: 'ship_2',
    speed: 5
  },
  BASE_ENEMY_SHIP: {
    type: patterns.ships.types.BASE_ENEMY_SHIP,
    hp: 30,
    img: 'ship_3',
    speed: 5
  },
};

