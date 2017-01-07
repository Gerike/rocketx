class EventExpiration {
  constructor() {
    this.delay = 0;
    this.expirationFrame = -1;
    this.outTransitions = [];
  }

  setOutTransitionBeforeDelete(outTransition) {
    this.delay = (this.delay > outTransition.takingTime) ? this.delay : outTransition.takingTime;
    this.outTransitions.push(outTransition);
  }

  fire() {
    this.expirationFrame = framework.timer.getCurrentFrameIndex() + this.delay;
    for(let i = 0; i < this.outTransitions.length; i++)
      this.outTransitions[i].activate();
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
