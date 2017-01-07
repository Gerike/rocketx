class FrameExpiration {
  constructor(expirationFrame) {
    this.expirationFrame = framework.timer.getCurrentFrameIndex() + expirationFrame;
  }

  expired() {
    return framework.timer.isFramePassed(this.expirationFrame);
  }

  getExpirationFrame() {
    return this.expirationFrame;
  }
}
