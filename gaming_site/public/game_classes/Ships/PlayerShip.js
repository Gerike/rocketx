/**
 * Created by Geri on 2016. 11. 13..
 */
class PlayerShip extends SpaceShip{
  constructor(x,y,img,weapons,extras){
    super(x,y,img)
    this.weapons = weapons;
    this.extras = extras;
  }
  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y);
  }
  shoot(){

  }
  frame(){
    if(framework.isDown(37))
      this.x-=2;
    if(framework.isDown(39))
      this.x+=2;
    if(framework.isDown(38))
      this.y-=2;
    if(framework.isDown(40))
      this.y+=2;
  }
}

