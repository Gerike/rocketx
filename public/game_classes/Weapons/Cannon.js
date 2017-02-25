class Cannon {
  constructor(ammo, linkedEntity) {
    this.ammo = ammo;
    this.linkedEntity = linkedEntity;
    this.ready = true;
    this.direction = 90;
  }

  makeCooldown() {
    this.ready = false;
    TimeHandler.getInstance().delegateFrameEvent(() => {
      this.ready = true;
    }, this.firerate);
  }

  linkTo(entity) {
    this.linkedEntity = entity;
  }

  shoot() {
    if (this.ready) {
      this._shoot(this.direction);
      this.makeCooldown();
    }
  }

  _shoot() {
  }
}
