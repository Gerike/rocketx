class EntityWithImage extends Entity {
  constructor(position, image){
    super(position);
    this.image = image;
  }

  draw(ctx, position = this.position){
    ctx.drawImage(this.image, position.getX(), position.getY());
  }

  getImage(){
    return this.image;
  }
}
