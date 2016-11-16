/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict'
class LinearPath extends Path{
  constructor(startX, startY, direction, speed, length = undefined){
    super(startX,  startY, speed);
    this.direction = direction;
    this.length = length;
    if (length){
      this.endX = this.x + Math.sin(this.direction * Math.PI / 180) * this.length;
      this.endY = this.y + Math.cos(this.direction * Math.PI / 180) * this.length * -1;
    }
  }

  _calculateNextWaypoint(){
    this.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
    this.y += Math.cos(this.direction * Math.PI / 180) * - 1 * this.speed;
    return {
      x: this.x,
      y: this.y
    };
  }

  * getWaypoint(){
    if (this.length === undefined)
      while(true){
        yield this._calculateNextWaypoint();
      }
    else
      while ((Math.abs(this.x - this.endX) > this.speed) || ((Math.abs(this.y - this.endY) > this.speed))) {
        yield this._calculateNextWaypoint();
    }
  }
}
