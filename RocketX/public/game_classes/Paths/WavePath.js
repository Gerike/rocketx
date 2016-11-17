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
    this.waveLength = this.maxElongation  / Math.sin(this.gradient * Math.PI / 180);

  }
  * _nextDirection(){
    while(true){
      yield this.direction - this.gradient;
      yield this.direction + this.gradient;
    }
  }
  * getWaypoints(){
    let nextDirection = this._nextDirection();
    let currentPath = new LinearPath(this.startX, this.startY, nextDirection.next().value, this.speed, this.waveLength).getWaypoints();
    let currentPos = currentPath.next();
    while(!currentPos.done){
      yield currentPos.value;
      currentPos = currentPath.next();
    }
    while(true){
      currentPath = new LinearPath(currentPos.value.x, currentPos.value.y, nextDirection.next().value, this.speed, this.waveLength*2).getWaypoints();
      currentPos = currentPath.next();
      while(!currentPos.done){
        yield currentPos.value;
        currentPos = currentPath.next();
      }
    }
  }
}

