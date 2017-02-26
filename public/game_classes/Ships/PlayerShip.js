class PlayerShip extends ArmedShip {
  constructor(position, hp, image, weapons, extras, speed) {
    super(position, hp, image, weapons, extras);
    this.speed = speed;
  }

  frame() {
    if (framework.isDown(37))
      if (this.position.getX() - this.speed < 0)
        this.position.setX(0);
      else
        this.position.setX(this.position.getX() - this.speed);

    if (framework.isDown(39))
      if (this.position.getX() + this.speed + this.image.width > framework.getConstants().CANVAS_WIDTH)
        this.position.setX(framework.getConstants().CANVAS_WIDTH - this.image.width);
      else
        this.position.setX(this.position.getX() + this.speed);

    if (framework.isDown(38))
      if (this.position.getY() - this.speed < 0)
        this.position.setY(0);
      else
        this.position.setY(this.position.getY() - this.speed);

    if (framework.isDown(40))
      if (this.position.getY() + this.speed + this.image.height > framework.getConstants().CANVAS_HEIGHT)
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

