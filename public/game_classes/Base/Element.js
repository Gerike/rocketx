class Element {
  constructor(position, expirationChecker) {
    this.position = position;
    this.expirationChecker = expirationChecker;
  }

  draw(ctx) {
    ctx.save();
    this._draw(ctx);
    ctx.restore();
  }

  _draw(ctx) {
  }

  isExpired() {
    if (this.expirationChecker !== undefined)
      return this.expirationChecker.expired();
    else
      return false;
  }
}
