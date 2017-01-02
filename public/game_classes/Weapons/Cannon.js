class Cannon {
  constructor(ammo, linked_entity){
    this.ammo = ammo;
    this.linked_entity = linked_entity;
    this.ready = true;
    this.direction = 90;
  }

  makeCooldown(){
    this.ready = false;
    framework.delegateFrameEvent(() => {this.ready = true}, this.firerate);
  }

  linkTo(entity){
    this.linked_entity = entity;
  }

  shoot() {
    if (this.ready) {
      this._shoot(this.direction);
      this.makeCooldown();
    }
  }

  _shoot(){}

}
