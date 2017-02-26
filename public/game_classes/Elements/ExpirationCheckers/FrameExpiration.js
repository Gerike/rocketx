class FrameExpiration extends ExpirationChecker {
  constructor(expirationFrame) {
    super();
    this.expirationFrame = this.timer.getCurrentFrameIndex() + expirationFrame;
  }

  expired() {
    return this.timer.isFramePassed(this.expirationFrame);
  }

  getExpirationFrame() {
    return this.expirationFrame;
  }

  setOutTransitionBeforeDelete(outTransition) {
    outTransition.waitUntilExpiring(this.expirationFrame);
  }
}
