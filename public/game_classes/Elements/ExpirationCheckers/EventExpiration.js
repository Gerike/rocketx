class EventExpiration {
  constructor() {
    this.delay = 0;
    this.expirationFrame = -1;
  }

  setOutTransitionBeforeDelete(outTransition) {
    this.delay = outTransition.takingTime;
    this.outTransition = outTransition;
  }

  fire() {
    this.expirationFrame = framework.timer.getCurrentFrameIndex() + this.delay;
    if (this.outTransition)
      this.outTransition.activate();
  }

  expired() {
    if (this.expirationFrame === -1)
      return false;
    else
      return framework.timer.isFramePassed(this.expirationFrame);

  }

  getExpirationFrame() {
    return this.expirationFrame;
  }
}
