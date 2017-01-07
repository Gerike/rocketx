class TextElement extends Element {
  constructor(position, expirationChecker, text, style, inTransition = null, outTransition = null) {
    super(position, expirationChecker);
    this.text = text;
    this.style = style;
    this.inTransition = inTransition;
    this.outTransition = outTransition;
    if (this.outTransition) outTransition.activateOnStartingFrame(this.expirationChecker.getExpirationFrame());
  }

  _draw(ctx) {
    if (this.inTransition !== null && !this.inTransition.isDone())
      this.inTransition.prepareContext(ctx);
    if (this.outTransition !== null && this.outTransition.activated)
      this.outTransition.prepareContext(ctx);
    this.style.prepareContext(ctx);
    this.position.prepareContext(ctx);
    ctx.fillText(this.text, this.position.getX(), this.position.getY());
  }
}
