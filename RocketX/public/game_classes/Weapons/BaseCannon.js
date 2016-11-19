/**
 * Created by Geri on 2016. 11. 14..
 */

class BaseCannon {
  constructor(ammo, firerate, ship_width, ship_height) {
    this.ammo = ammo;
    this.firerate = firerate;
    this.ready = true;
    this.ship_width = ship_width;
    this.ship_height = ship_height;
  }

  shoot(x, y, direction) {
    if (this.ready === true) {
      this.ready = false;
      setTimeout(() => this.ready = true, this.firerate * 300);
      let projectile_x = x + this.ship_width/2 + Math.sin(direction * Math.PI / 180) * this.ship_width/2 - 5;
      let projectile_y = y + this.ship_height/2 + Math.cos(direction * Math.PI / 180) * this.ship_height/2 * - 1;
      this.ammo.createProjectile(projectile_x, projectile_y, direction);
    }
  }
}
