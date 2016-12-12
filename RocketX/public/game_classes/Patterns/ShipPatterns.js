SHIP_TYPES = {
  BASE_ENEMY_SHIP: BaseEnemyShip,
  PLAYER_SHIP: PlayerShip,
};

SHIPS = {
  BASE_PLAYER_SHIP: {
    type: SHIP_TYPES.PLAYER_SHIP,
    hp: 100,
    img: 'ship_2',
    speed: 5
  },
  BASE_ENEMY_SHIP: {
    type: SHIP_TYPES.BASE_ENEMY_SHIP,
    hp: 30,
    img: 'ship_3',
    speed: 5
  },
};

