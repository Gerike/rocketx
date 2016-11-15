/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class LinearPath extends Path{
  constructor(startX, startY, direction){
    super(startX,  startY);
    this.direction = direction;
  }
  * getWaypoint(){
    while(true){
      this.x += Math.sin(this.direction * Math.PI / 180);
      this.y += Math.cos(this.direction * Math.PI / 180) * - 1;
      yield {
        x: this.x,
        y: this.y
      };
    }
  }
}
