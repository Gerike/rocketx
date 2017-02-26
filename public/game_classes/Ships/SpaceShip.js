class SpaceShip extends EntityWithImage {
  constructor(position, hp, image) {
    super(position, image);
    this.hp = hp;
  }

  modifyHp(hp) {
    this.hp += hp;
  }
}
