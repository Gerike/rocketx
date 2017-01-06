let POSITIONS = {};

POSITIONS.X = {
  'RIGHT': 'RIGHT',
  'CENTER': 'CENTER',
  'LEFT': 'LEFT',
};

POSITIONS.Y = {
  'TOP': 'TOP',
  'CENTER': 'CENTER',
  'BOTTOM': 'BOTTOM',
};


class Position {
  constructor(xPos, yPos){
    if (isNaN(xPos)) {
      this.xAlign = xPos;
      this.yAlign = yPos;
      this.offset = 20;
      switch(this.xAlign){
        case 'RIGHT': this.x = framework.constants.canvasWidth - this.offset; break;
        case 'CENTER': this.x = framework.constants.canvasWidth/2; break;
        case 'LEFT': this.x = this.offset; break;
        default: throw 'Unsupported position'; break;
      }
      switch(this.yAlign){
        case 'TOP': this.y = this.offset; break;
        case 'CENTER': this.y = framework.constants.canvasHeight/2; break;
        case 'BOTTOM': this.y = framework.constants.canvasHeight - this.offset; break;
        default: throw 'Unsupported position'; break;
      }
    }
    else {
      this.x = xPos;
      this.y = yPos;
      this.xAlign = POSITIONS.X.LEFT;
      this.yAlign = POSITIONS.Y.TOP;
    }
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  prepareContext(ctx){}
}
