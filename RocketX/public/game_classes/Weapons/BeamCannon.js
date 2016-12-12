/**
 * Created by Win10 on 2016. 12. 11..
 */
class BeamCannon{
  constructor(ammo, firerate, ship_width, ship_height) {
    this.ready = true;
    this.ammo = ammo;
    this.firerate = firerate;
    this.ship_width = ship_width;
    this.ship_height = ship_height;
  }
  shoot(x, y, direction) {
    if (this.ready) {
      let projectile_x = x + this.ship_width/2 + Math.sin(direction * Math.PI / 180) * this.ship_width/2 - 5;
      let projectile_y = -7 +y + this.ship_height/2 + Math.cos(direction * Math.PI / 180) * this.ship_height/2 * - 1;
      this.ammo.createProjectile(projectile_x, projectile_y, direction);
      //framework.delegateFrameEvent(() => {this.makeCooldown()}, 90);
      this.makeCooldown();
    }
  }
  makeCooldown(){
    this.ready = false;
    framework.delegateFrameEvent(() => {this.ready = true}, this.firerate);
  }
}
