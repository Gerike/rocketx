'use strict';
class WavePath extends Path {
  constructor(startPosition, speed, direction, maxElongation, gradient) {
    super(startPosition, speed);
    this.direction = direction;
    this.gradient = gradient;
    this.maxElongation = maxElongation;
    this.waveLength = this.maxElongation / Math.sin(this.gradient * Math.PI / 180);

  }

  * _nextDirection() {
    while (true) {
      yield this.direction - this.gradient;
      yield this.direction + this.gradient;
    }
  }

  * getWaypoints() {
    let nextDirection = this._nextDirection();
    let currentPath = new LinearPath(this.startPosition, nextDirection.next().value, this.speed, this.waveLength).getWaypoints();
    let currentPos = currentPath.next();
    while (!currentPos.done) {
      yield currentPos.value;
      currentPath.speed = this.speed;
      currentPos = currentPath.next();
    }
    while (true) {
      currentPath = new LinearPath(currentPos.value, nextDirection.next().value, this.speed, this.waveLength * 2).getWaypoints();
      currentPos = currentPath.next();
      while (!currentPos.done) {
        yield currentPos.value;
        currentPath.speed = this.speed;
        currentPos = currentPath.next();
      }
    }
  }
}

