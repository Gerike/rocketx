/**
 * Created by Geri on 2016. 11. 14..
 */

class BaseCannon {
  constructor(ammo, firerate) {
    this.ammo = ammo;
    this.firerate = firerate;
    this.ready = true;
  }

  shoot(x, y, direction) {
    if (this.ready === true) {
      this.ready = false;
      setTimeout(() => this.ready = true, this.firerate * 1000);
      this.ammo.createProjectile(x, y, direction);
    }
  }
}
