class TripleCannon extends BaseCannon{
  constructor(ammo, firerate, ship_width, ship_height){
    super(ammo, firerate, ship_width, ship_height);
  }
  shoot(x, y, direction) {
    if (this.ready === true) {
      this.ready = false;
      setTimeout(() => this.ready = true, this.firerate * 100);
      let dirs = Array(3);
      dirs[0] = direction - 20;
      dirs[1] = direction;
      dirs[2] = direction + 20;
      for (let i = 0; i < 3; i++) {
        let projectile_x = x + this.ship_width / 2 + Math.sin(dirs[i] * Math.PI / 180) * this.ship_width / 2 - 5;
        let projectile_y = y + this.ship_height / 2 + Math.cos(dirs[i] * Math.PI / 180) * this.ship_height / 2 * -1;
        this.ammo.createProjectile(projectile_x, projectile_y, dirs[i]);
      }
    }
  }
}
