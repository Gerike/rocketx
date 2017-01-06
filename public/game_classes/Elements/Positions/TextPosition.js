let POSITIONS = {};

POSITIONS.X = {
  'RIGHT': {value: 1, prepareContext: function(ctx) {ctx.textAlign="right"}},
  'CENTER': {value: 2, prepareContext: function(ctx) {ctx.textAlign="center"}},
  'LEFT': {value: 3, prepareContext: function(ctx) {ctx.textAlign="left"}},
};

POSITIONS.Y = {
  'TOP': {value: 4, prepareContext: function(ctx) {ctx.textBaseline="top"}},
  'CENTER': {value: 5, prepareContext: function(ctx) {ctx.textBaseline="middle"}},
  'BOTTOM': {value: 6, prepareContext: function(ctx) {ctx.textBaseline="bottom"}},
};

class TextPosition {
  constructor(xPos, yPos){
      if (isNaN(xPos)) {
        this.xAlign = xPos;
        this.yAlign = yPos;
        this.offset = 20;
        switch(this.xAlign.value){
          case 1: this.x = framework.constants.canvasWidth - this.offset; break;
          case 2: this.x = framework.constants.canvasWidth/2; break;
          case 3: this.x = this.offset; break;
          default: throw 'Unsupported position'; break;
        }
        switch(this.yAlign.value){
          case 4: this.y = this.offset; break;
          case 5: this.y = framework.constants.canvasHeight/2; break;
          case 6: this.y = framework.constants.canvasHeight - this.offset; break;
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
  prepareContext(ctx){
    this.xAlign.prepareContext(ctx);
    this.yAlign.prepareContext(ctx);
  }

}
