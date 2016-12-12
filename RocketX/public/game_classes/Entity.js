/**
 * Created by Win10 on 2016. 12. 12..
 */
class Entity {
  constructor (x,y){
    this.x = x;
    this.y = y;
  }

  frame (){}
  draw(ctx){}
  collided(object){}
}
