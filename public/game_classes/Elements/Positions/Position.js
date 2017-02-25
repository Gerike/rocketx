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


class ElementPosition {
  constructor(xPos, yPos, offset = 0) {
    this.offset = offset;
    if (isNaN(xPos)) {
      this.xAlign = xPos;
      this.yAlign = yPos;
      switch (this.xAlign) {
        case 'RIGHT':
          this.x = framework.getConstants().CANVAS_WIDTH - this.offset;
          break;
        case 'CENTER':
          this.x = framework.getConstants().CANVAS_WIDTH / 2;
          break;
        case 'LEFT':
          this.x = this.offset;
          break;
        default:
          throw 'Unsupported position';
      }
      switch (this.yAlign) {
        case 'TOP':
          this.y = this.offset;
          break;
        case 'CENTER':
          this.y = framework.getConstants().CANVAS_HEIGHT / 2;
          break;
        case 'BOTTOM':
          this.y = framework.getConstants().CANVAS_HEIGHT - this.offset;
          break;
        default:
          throw 'Unsupported position';
      }
    }
    else {
      this.x = xPos;
      this.y = yPos;
      this.xAlign = POSITIONS.X.LEFT;
      this.yAlign = POSITIONS.Y.TOP;
    }
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  prepareContext(ctx) {
  }
}
