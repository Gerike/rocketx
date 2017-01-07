class ImageElement extends Element{
  constructor(position, expirationChecker, image, inTransition = null, outTransition = null){
    super(position, expirationChecker);
    this.image = image;
    this.inTransition = inTransition;
    this.outTransition = outTransition;
    if (this.outTransition) this.outTransition.activateOnStartingFrame(this.expirationChecker.getExpirationFrame());
  }

  _draw(ctx){
    if(this.inTransition !== null && !this.inTransition.isDone())
      this.inTransition.prepareContext(ctx);
    if(this.outTransition !== null && this.outTransition.activated)
      this.outTransition.prepareContext(ctx);
    this.position.prepareContext(ctx, this.image);
    ctx.drawImage(this.image, this.position.getX(), this.position.getY());
  }
}
