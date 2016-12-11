class SpaceShip {
  constructor(x, y, hp, img) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.img = img;
  }

  modifyHp(hp){
    this.hp += hp;
  }
}
