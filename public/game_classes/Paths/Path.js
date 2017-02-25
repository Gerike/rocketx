'use strict';
class Path {
  constructor(startX, startY, speed) {
    this.startX = startX;
    this.startY = startY;
    this.speed = speed;
  }

  _adjustSpeed(speed) {
    this._previousSpeed = this.speed;
    this.speed = speed;
  }

  _revertSpeed() {
    this.speed = this._previousSpeed;
  }

  adjustSpeed(speed, frame = 0) {
    this._adjustSpeed(speed);
    if (frame)
      TimeHandler.getInstance().delegateFrameEvent(() => {
        this._revertSpeed();
      }, frame);
  }
}

