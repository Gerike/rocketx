class RepeatCannon extends BaseCannon {
  constructor(ammo, firerate, linked_entity, projectiles_count, delay) {
    super(ammo, firerate, linked_entity);
    this.projectiles_count = projectiles_count;
    this.clip = projectiles_count;
    this.delay = delay;
  }

  shoot() {
    if (this.ready) {
      this._shoot(this.direction);
      this.makeCooldown(this.firerate);
    }
  }

  makeCooldown() {
    this.ready = false;
    if (this.clip <= 0)
      framework.delegateFrameEvent(() => {
        this.ready = true;
        this.clip = this.projectiles_count;
      }, this.firerate);
    else {
      this.clip  -= 1;
      framework.delegateFrameEvent(() => {
        this.ready = true;
      }, this.delay);
    }
  }
}
