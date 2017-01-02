class NCannon extends BaseCannon{
  constructor(ammo, firerate, linked_entity, projectile_count){
    super(ammo, firerate, linked_entity);
    this.projectile_count = projectile_count;
    this._shooting_angle = 30;

  }
  _shoot(direction) {
      let projectile_angle_diff = this._shooting_angle / this.projectile_count;
      let left = this.projectile_count;
      super._shoot(direction);
      left--;
      let temp_direction  = direction;
      for (let i = 0; i < (this.projectile_count -1) / 2; i++) {
        temp_direction += projectile_angle_diff;
        super._shoot(temp_direction);
        left--;
      }

      temp_direction  = direction;
      for (let i = 0; i < left; i++) {
        temp_direction -= projectile_angle_diff;
        super._shoot(temp_direction);
      }
  }
}
