/**
 * Created by Geri on 2016. 11. 15..
 */
class StraightLinePath{
  constructor(x,y,direction){
    this.startPointX = x;
    this.startPointY = y;
    this.speed = 1;
    this.direction = direction;
    this.counter = 0;
  }

  * getNextWayPoint (){
    this.counter += 1;
    if (this.direction === 270)
      yield {
        y: this.startPointY,
        x: this.startPointX - this.counter * this.speed
      }
    else if (this.direction === 90)
      yield {
        y: this.startPointY,
        x: this.startPointX + this.counter * this.speed
      }
  }
}
