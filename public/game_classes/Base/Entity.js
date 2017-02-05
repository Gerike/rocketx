class Entity {
  constructor (x,y){
    this.x = x;
    this.y = y;
  }

  getPosition(){
    return {
      x: this.x,
      y: this.y,
    }
  }
  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  frame (){}
  draw(ctx){}
  collided(object){}
  executeEffect(object){}
}
