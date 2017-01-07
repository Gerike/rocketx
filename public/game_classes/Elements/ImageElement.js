class ImageElement extends Element{
  constructor(position, expirationChecker, image){
    super(position, expirationChecker);
    this.image = image;
  }

  _draw(ctx){
    this.position.prepareContext(ctx, this.image);
    ctx.drawImage(this.image, this.position.getX(), this.position.getY());
  }
}
