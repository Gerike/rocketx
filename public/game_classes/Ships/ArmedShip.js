class ArmedShip extends SpaceShip{
  constructor(x, y, hp, img, weapons, extras){
    super(x, y, hp, img);

    this.weapons =[];
    this.activeWeapon = 0;
    this.extras = extras;
    this.canSwitch = true;

    for (let weapon in weapons){
      weapon.linkTo(this);
      this.weapons.push(weapon)
    }
  }

  addWeapon(weapon){
      weapon.linkTo(this);
      this.weapons.push(weapon);
  }

  shoot() {
    if (this.weapons.length > 0)
      this.weapons[this.activeWeapon].shoot();
  }

  changeWeapon(){
    if (this.canSwitch){
      this.activeWeapon++;
      if(this.activeWeapon === this.weapons.length)
        this.activeWeapon = 0;
      this.canSwitch = false;
      framework.timer.delegateFrameEvent(() => {this.canSwitch = true;}, 30)
    }

  }
}
