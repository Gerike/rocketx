class ArmedShip extends SpaceShip {
  constructor(position, hp, image, weapons = [], extras) {
    super(position, hp, image);

    this._weapons = [];
    this._activeWeapon = 0;
    this._extras = extras;
    this._canSwitch = true;

    for (let weapon of weapons) {
      weapon.linkTo(this);
      this._weapons.push(weapon);
    }
  }

  addWeapon(weapon) {
    weapon.linkTo(this);
    this._weapons.push(weapon);
    framework.registerEvent("changeWeapon", this);
  }

  shoot() {
    if (this._weapons.length > 0)
      this._weapons[this._activeWeapon].shoot();
  }

  changeWeapon() {
    if (this._canSwitch) {
      this._activeWeapon++;
      if (this._activeWeapon === this._weapons.length)
        this._activeWeapon = 0;
      this._canSwitch = false;
      framework.registerEvent("changeWeapon", this);
      TimeHandler.getInstance().delegateFrameEvent(() => {
        this._canSwitch = true;
      }, 10);
    }
  }
}
