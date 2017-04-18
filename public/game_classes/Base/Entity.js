class Entity {
  constructor(position) {
    this._position = position;
    this._collidable = true;
  }

  getPosition() {
    return this._position;
  }

  disableCollision(){
    this._collidable = false;
  }

  enableCollision(){
    this._collidable = true;
  }

  isCollidable(){
    return this._collidable;
  }

  frame() {
  }

  draw(ctx) {
  }

  collided(object) {
  }

  getImage(){
    return false;
  }

  getWidth(){
    return 0;
  }

  getHeight(){
    return 0;
  }
}
