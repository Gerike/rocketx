AMMO_TYPES = {
  BASE: BaseAmmo,
  FREEZING: FreezingAmmo,
  LASER: LaserAmmo,
};

AMMOS = {
  BASE_AMMO: {
    type: AMMO_TYPES.BASE,
    damage: 10,
    img: 'laser_2',
    firerate: 5
  },

  FREEZING_AMMO: {
    type: AMMO_TYPES.FREEZING,
    damage: 5,
    img: 'laser_3',
    firerate: 5
  },

  BASE_LASER_AMMO: {
    type: AMMO_TYPES.LASER,
    damage: 1,
    img: 'laser_4',
    uptime: 60
  },
};
