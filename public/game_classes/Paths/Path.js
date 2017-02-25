/**
 * Created by Geri on 2016. 11. 15..
 */
'use strict';
class Path {
  constructor(startX, startY, speed) {
    this.startX = startX;
    this.startY = startY;
    this.speed = speed;
  }

  _adjustSpeed(speed) {
    this._previous_speed = this.speed;
    this.speed = speed;
  }

  _revertSpeed() {
    this.speed = this._previous_speed;
  }

  adjustSpeed(speed, frame = 0) {
    this._adjustSpeed(speed);
    if (frame)
      TimeHandler.getInstance().delegateFrameEvent(() => {
        this._revertSpeed()
      }, frame);
  }
}

