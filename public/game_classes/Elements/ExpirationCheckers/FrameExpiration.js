class FrameExpiration {
  constructor(expirationFrame){
    this.expirationFrame = expirationFrame;
  }

  expired(){
    return framework.timer.isFramePassed(this.expirationFrame);
  }
}
