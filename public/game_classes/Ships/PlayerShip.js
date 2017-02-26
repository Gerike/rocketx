class PlayerShip extends ArmedShip {
  constructor(position, hp, image, weapons, extras, speed) {
    super(position, hp, image, weapons, extras);
    this.speed = speed;
  }

  frame() {
    if (framework.isDown(37))
      if (this._position.getX() - this.speed < 0)
        this._position.setX(0);
      else
        this._position.setX(this._position.getX() - this.speed);

    if (framework.isDown(39))
      if (this._position.getX() + this.speed + this._image.width > framework.getConstants().CANVAS_WIDTH)
        this._position.setX(framework.getConstants().CANVAS_WIDTH - this._image.width);
      else
        this._position.setX(this._position.getX() + this.speed);

    if (framework.isDown(38))
      if (this._position.getY() - this.speed < 0)
        this._position.setY(0);
      else
        this._position.setY(this._position.getY() - this.speed);

    if (framework.isDown(40))
      if (this._position.getY() + this.speed + this._image.height > framework.getConstants().CANVAS_HEIGHT)
        this._position.setY(framework.getConstants().CANVAS_HEIGHT - this.img.height);
      else
        this._position.setY(this._position.getY() + this.speed);

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

