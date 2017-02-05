class SpaceShip extends Entity {
  constructor(x, y, hp, img) {
    super(x, y);
    this.hp = hp;
    this.img = img;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y)
  }

  modifyHp(hp) {
    this.hp += hp;
  }
}
