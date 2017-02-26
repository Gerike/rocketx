patterns.weapons = {};

patterns.weapons.types = {
  BASE_CANNON: BaseCannon,
  NCannon: NCannon,
  BEAM_CANNON: BeamCannon,
};

patterns.weapons = {
  BASE_CANNON: {
    type: patterns.weapons.types.BASE_CANNON,
    _firerate: 30,
  },
  TRIPLE_CANNON: {
    type: patterns.weapons.types.NCannon,
    _firerate: 30,
    _projectileCount: 3,
  },
  BEAM_CANNON: {
    type: patterns.weapons.types.BEAM_CANNON,
    _firerate: 300,
  },
};
