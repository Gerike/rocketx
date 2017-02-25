class EventExpiration extends ExpirationChecker{
  constructor() {
    super();
    this.delay = 0;
    this.expirationFrame = -1;
    this.outTransitions = [];
  }

  setOutTransitionBeforeDelete(outTransition) {
    this.delay = (this.delay > outTransition.getLength()) ? this.delay : outTransition.getLength();
    this.outTransitions.push(outTransition);
  }

  fire() {
    this.expirationFrame = this.timer.getCurrentFrameIndex() + this.delay;
    for (let i = 0; i < this.outTransitions.length; i++)
      this.outTransitions[i].activate();
  }

  expired() {
    if (this.expirationFrame === -1)
      return false;
    else
      return this.timer.isFramePassed(this.expirationFrame);

  }

  getExpirationFrame() {
    return this.expirationFrame;
  }
}
