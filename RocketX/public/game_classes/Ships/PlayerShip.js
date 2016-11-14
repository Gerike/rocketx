/**
 * Created by Geri on 2016. 11. 13..
 */
class PlayerShip extends SpaceShip {
  constructor(x, y, img, weapons, extras, speed) {
    super(x, y, img, speed)
    this.weapons = weapons;
    this.extras = extras;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  shoot() {
    for (let i = 0; i < this.weapons.length; i++)
      this.weapons[i].shoot(this.x, this.y, 90);
  }

  frame() {
    if (framework.isDown(37))
      this.x -= this.speed;
    if (framework.isDown(39))
      this.x += this.speed;
    if (framework.isDown(38))
      this.y -= this.speed;
    if (framework.isDown(40))
      this.y += this.speed;
    if (framework.isDown(32))
      this.shoot();
  }
}

