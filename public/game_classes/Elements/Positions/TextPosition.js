class TextPosition extends Position {
  constructor(xPos, yPos, offset = 0) {
    super(xPos, yPos, offset);
  }

  prepareContext(ctx) {
    switch (this.xAlign) {
      case 'RIGHT':
        ctx.textAlign = "right";
        break;
      case 'CENTER':
        ctx.textAlign = "center";
        break;
      case 'LEFT':
        ctx.textAlign = "left";
        break;
      default:
        throw 'Unsupported position';
        break;
    }
    switch (this.yAlign) {
      case 'TOP':
        ctx.textBaseline = "top";
        break;
      case 'CENTER':
        ctx.textBaseline = "middle";
        break;
      case 'BOTTOM':
        ctx.textBaseline = "bottom";
        break;
      default:
        throw 'Unsupported position';
        break;
    }
  }

}
