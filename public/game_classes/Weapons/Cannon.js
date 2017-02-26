class Cannon {
  constructor(ammo, linkedEntity, firerate) {
    this.ammo = ammo;
    this.linkedEntity = linkedEntity;
    this._ready = true;
    this.direction = 90;
    this._firerate = firerate;
  }

  makeCooldown() {
    this._ready = false;
    TimeHandler.getInstance().delegateFrameEvent(() => {
      this._ready = true;
    }, this._firerate);
  }

  linkTo(entity) {
    this.linkedEntity = entity;
  }

  shoot() {
    if (this._ready) {
      this._shoot(this.direction);
      this.makeCooldown();
    }
  }

  _shoot() {
  }
}
