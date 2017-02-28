class PlayerShip extends ArmedShip {
  constructor(position, hp, image, weapons, extras, speed) {
    super(position, hp, image, weapons, extras);
    this.speed = speed;
  }

  frame() {
    if (framework.isDown(PlayerShip.getControlKeys().LEFT))
      if (this._position.getX() - this.speed < 0)
        this._position.setX(0);
      else
        this._position.setX(this._position.getX() - this.speed);

    if (framework.isDown(PlayerShip.getControlKeys().RIGHT))
      if (this._position.getX() + this.speed + this._image.width > framework.getConstants().CANVAS_WIDTH)
        this._position.setX(framework.getConstants().CANVAS_WIDTH - this._image.width);
      else
        this._position.setX(this._position.getX() + this.speed);

    if (framework.isDown(PlayerShip.getControlKeys().UP))
      if (this._position.getY() - this.speed < 0)
        this._position.setY(0);
      else
        this._position.setY(this._position.getY() - this.speed);

    if (framework.isDown(PlayerShip.getControlKeys().DOWN))
      if (this._position.getY() + this.speed + this._image.height > framework.getConstants().CANVAS_HEIGHT)
        this._position.setY(framework.getConstants().CANVAS_HEIGHT - this.getImage().height);
      else
        this._position.setY(this._position.getY() + this.speed);

    if (framework.isDown(PlayerShip.getControlKeys().SHOOT))
      this.shoot();
    if (framework.isDown(PlayerShip.getControlKeys().WEAPONCHANGE))
      this.changeWeapon();
  }

  collided(object) {
    framework.requestDestroy(this, 'Killed');
  }

  executeEffect(object) {
  }

  static getControlKeys() {
    return {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SHOOT: 32,
      WEAPONCHANGE: 81

    }
  }
}

