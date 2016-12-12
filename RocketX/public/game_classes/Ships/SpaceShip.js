class SpaceShip extends Entity{
  constructor(x, y, hp, img) {
    super(x,y);
    this.hp = hp;
    this.img = img;
  }

  modifyHp(hp){
    this.hp += hp;
  }
}
