/**
 * Created by Geri on 2016. 11. 13..
 */
class PlayerShip extends ArmedShip {
  constructor(position, hp, img, weapons, extras, speed) {
    super(position, hp, img, weapons, extras);
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.position.getX(), this.position.getY());
  }

  frame() {
    if (framework.isDown(37))
      if (this.position.getX() - this.speed < 0)
        this.position.setX(0);
      else
        this.position.setX(this.position.getX() - this.speed);

    if (framework.isDown(39))
      if (this.position.getX() + this.speed + this.img.width > framework.getConstants().CANVAS_WIDTH)
        this.position.setX(framework.getConstants().CANVAS_WIDTH - this.img.width);
      else
        this.position.setX(this.position.getX() + this.speed);

    if (framework.isDown(38))
      if (this.position.getY() - this.speed < 0)
        this.position.setY(0);
      else
        this.position.setY(this.position.getY() - this.speed);

    if (framework.isDown(40))
      if (this.position.getY() + this.speed + this.img.height > framework.getConstants().CANVAS_HEIGHT)
        this.position.setY(framework.getConstants().CANVAS_HEIGHT - this.img.height);
      else
        this.position.setY(this.position.getY() + this.speed);

    if (framework.isDown(32))
      this.shoot();
    if (framework.isDown(81))
      this.changeWeapon();
  }

  collided(object) {
    framework.requestDestroy(this, 'Killed');
  }

  executeEffect(object) {
  }

}

