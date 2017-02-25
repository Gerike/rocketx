class SpaceShip extends Entity {
  constructor(position, hp, img) {
    super(position);
    this.hp = hp;
    this.img = img;
  }

  modifyHp(hp) {
    this.hp += hp;
  }
}
