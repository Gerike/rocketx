class ArmedShip extends SpaceShip{
  constructor(x, y, hp, img, weapons, extras){
    super(x, y, hp, img);

    this.weapons =[];
    this.extras = extras;

    for (let weapon in this.weapons){
      weapon.linkTo(this);
      this.weapons.push(weapon)
    }
  }

  addWeapon(weapon){
      weapon.linkTo(this);
      this.weapons.push(weapon);
  }

  shoot() {
    for(let weapon of this.weapons)
      weapon.shoot();
  }
}
