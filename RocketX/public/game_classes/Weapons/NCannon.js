class NCannon extends BaseCannon{
  constructor(ammo, firerate, linked_entity, projectile_count){
    super(ammo, firerate, linked_entity);
    this.projectile_count = projectile_count;
    this._shooting_angle = 30;

  }
  _shoot() {
      let projectile_angle_diff = this._shooting_angle / this.projectile_count;

      let left = this.projectile_count;
      this._shoot(this.direction);
      left--;

      let temp_direction  = this.direction;
      for (let i = 0; i < (this.projectile_count -1) / 2; i++) {
        temp_direction += projectile_angle_diff;
        this._shoot(temp_direction);
        left--;
      }

      temp_direction  = this.direction;
      for (let i = 0; i < left; i++) {
        temp_direction -= projectile_angle_diff;
        this._shoot(temp_direction);
      }
  }
}
