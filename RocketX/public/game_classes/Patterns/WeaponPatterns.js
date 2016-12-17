patterns.weapons = {};

patterns.weapons.types = {
  BASE_CANNON: BaseCannon,
  NCannon: NCannon,
  BEAM_CANNON: BeamCannon,
};

patterns.weapons = {
  BASE_CANNON: {
    type: patterns.weapons.types.BASE_CANNON,
    firerate: 30,
  },
  TRIPLE_CANNON: {
    type: patterns.weapons.types.NCannon,
    firerate: 30,
    projectile_count: 3,
  },
  BEAM_CANNON: {
    type: patterns.weapons.types.BEAM_CANNON,
    firerate: 30,
  },
};
