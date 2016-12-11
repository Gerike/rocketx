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
      this.endX = this.startX + Math.sin(this.direction * Math.PI / 180) * this.length;
      this.endY = this.startY + Math.cos(this.direction * Math.PI / 180) * this.length * -1;
    }
  }

  _calculateNextWaypoint(currentPos){
    currentPos.x += Math.sin(this.direction * Math.PI / 180) * this.speed;
    currentPos.y += Math.cos(this.direction * Math.PI / 180) * - 1 * this.speed;
    return currentPos
  }

  * getWaypoints(){
    let currentPos = {x: this.startX,  y: this.startY};
    if (this.length === undefined)
      while(true){
        yield this._calculateNextWaypoint(currentPos);
      }
    else
      while ((Math.abs(currentPos.x - this.endX) > this.speed) || ((Math.abs(currentPos.y - this.endY) > this.speed)))
        yield this._calculateNextWaypoint(currentPos);
      return currentPos;
  }

}
