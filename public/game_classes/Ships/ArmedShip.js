class ArmedShip extends SpaceShip {
  constructor(position, hp, image, weapons = [], extras) {
    super(position, hp, image);

    this.weapons = [];
    this.activeWeapon = 0;
    this.extras = extras;
    this.canSwitch = true;

    for (let weapon of weapons) {
      weapon.linkTo(this);
      this.weapons.push(weapon);
    }
  }

  addWeapon(weapon) {
    weapon.linkTo(this);
    this.weapons.push(weapon);
    framework.registerEvent("changeWeapon", this);
  }

  shoot() {
    if (this.weapons.length > 0)
      this.weapons[this.activeWeapon].shoot();
  }

  changeWeapon() {
    if (this.canSwitch) {
      this.activeWeapon++;
      if (this.activeWeapon === this.weapons.length)
        this.activeWeapon = 0;
      this.canSwitch = false;
      framework.registerEvent("changeWeapon", this);
      TimeHandler.getInstance().delegateFrameEvent(() => {
        this.canSwitch = true;
      }, 10);
    }
  }
}
