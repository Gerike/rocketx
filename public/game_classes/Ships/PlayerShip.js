/**
 * Created by Geri on 2016. 11. 13..
 */
class PlayerShip extends ArmedShip {
  constructor(x, y, hp, img, weapons, extras, speed) {
    super(x, y, hp, img, weapons, extras);
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame() {
    if (framework.isDown(37))
      if (this.x - this.speed < 0) this.x = 0; else this.x -= this.speed;
    if (framework.isDown(39))
      if (this.x + this.speed + this.img.width > canvasWidth ) this.x = canvasWidth - this.img.width; else this.x += this.speed;
    if (framework.isDown(38))
      if (this.y - this.speed < 0) this.y = 0; else this.y -= this.speed;
    if (framework.isDown(40))
      if (this.y + this.speed + this.img.height > canvasHeight ) this.y = canvasHeight - this.img.height; else this.y += this.speed;
    if (framework.isDown(32))
      this.shoot();
  }

  collided(object){
    framework.requestDestroy(this)
  }

  executeEffect(object){
    object.hp -= 100;
  }

}

