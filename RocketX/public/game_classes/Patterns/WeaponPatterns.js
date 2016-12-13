patterns.weapons = {}

patterns.weapons.types = {
  BASE_CANNON: BaseCannon,
  TRIPLE_CANNON: TripleCannon,
  BEAM_CANNON: BeamCannon,
};

patterns.weapons = {
  BASE_CANNON: {
    type: patterns.weapons.types.BASE_CANNON,
    firerate: 30,
    ship_img: 'ship_2'
  },
  BASE_TRIPLE_CANNON: {
    type: patterns.weapons.types.TRIPLE_CANNON,
    firerate: 30,
    ship_img: 'ship_2'
  },
  BASE_BEAM_CANNON: {
    type: patterns.weapons.types.BEAM_CANNON,
    firerate: 30,
    ship_img: 'ship_2'
  },
};
