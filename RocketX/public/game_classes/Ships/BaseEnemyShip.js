/**
 * Created by Geri on 2016. 11. 15..
 */
class BaseEnemyShip extends SpaceShip {
  constructor(x, y, img, weapons, extras, speed) {
    super(x, y, img);
    this.weapons = weapons;
    this.extras = extras;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame(){}

  shoot(){}
}
