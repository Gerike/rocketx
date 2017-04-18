class EntityWithImage extends Entity {
  constructor(position, image){
    super(position);
    this._image = image;
  }

  draw(ctx, position = this._position){
    ctx.drawImage(this._image, position.getX(), position.getY());
  }

  getImage(){
    return this._image;
  }

  getWidth(){
    return this._image.width;
  }

  getHeight(){
    return this._image.height;
  }
}
