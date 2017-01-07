class ImageElement extends Element{
  constructor(position, expirationChecker, image, inTransition = null, outTransition = null){
    super(position, expirationChecker);
    this.image = image;
    this.inTransition = inTransition;
    this.outTransition = outTransition;
  }

  _draw(ctx){
    if(this.inTransition !== null && !this.inTransition.isDone())
      this.inTransition.prepareContext(ctx);
    if(this.outTransition !== null && this.outTransition.hasToRun(this.expirationChecker.getExpirationFrame()))
      this.outTransition.prepareContext(ctx);
    this.position.prepareContext(ctx, this.image);
    ctx.drawImage(this.image, this.position.getX(), this.position.getY());
  }
}
