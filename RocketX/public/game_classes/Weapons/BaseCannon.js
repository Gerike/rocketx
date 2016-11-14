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
      setTimeout(() => this.ready = true, this.firerate * 1000);
      let projectile_x;
      let projectile_y;
      switch (direction) {
        case 0:
          projectile_x = x + this.ship_width / 2;
          projectile_y = y + 3;
          break;
        case 90:
          projectile_x = x + this.ship_width + 3;
          projectile_y = y + this.ship_height / 2;
          break;
        case 180:
          projectile_x = x + this.ship_width / 2;
          projectile_y = y - this.ship_height - 3;
          break;
        case 270:
          projectile_x = x - 10;
          projectile_y = y + this.ship_height / 2;
          break;
      }
      this.ammo.createProjectile(projectile_x, projectile_y, direction);
    }
  }
}
