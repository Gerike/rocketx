/**
 * Created by Geri on 2016. 11. 16..
 */
'use strict'
class WavePath extends Path {
  constructor(startX, startY, direction, speed, maxElongation, gradient){
    super(startX,  startY,  speed);
    this.direction = direction;
    this.gradient = gradient;
    this.maxElongation = maxElongation;
    this.atfogo = this.maxElongation  / Math.sin(this.gradient * Math.PI / 180);
    this.currentPath = new LinearPath(this.x, this.y, this.direction + this.gradient, this.speed, this.atfogo);
  }
  * getWaypoint(){
      this.cp = this.currentPath.getWaypoint().next();
      while(!this.cp.done){
        this.x = this.cp.value.x;
        this.y = this.cp.value.y;
        yield {
          x: this.x,
          y: this.y
        }
        this.cp = this.currentPath.getWaypoint().next()
      }
  }

  *test () {
    let x = 0;
    while(true){
      x += 1;
      yield x;
    }
  }
}
