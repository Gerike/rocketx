class Element{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  draw(ctx){
    ctx.save();
    this._draw(ctx);
    ctx.restore();
  }
  _draw(ctx){}
}
