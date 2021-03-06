class ImagePosition extends ElementPosition {
  constructor(xPos, yPos, offset = 0) {
    super(xPos, yPos, offset);
  }

  prepareContext(ctx, desiredImage) {
    let newStartingX, newStartingY;
    switch (this.xAlign) {
      case 'RIGHT':
        newStartingX = -desiredImage.width;
        break;
      case 'CENTER':
        newStartingX = -desiredImage.width / 2;
        break;
      case 'LEFT':
        newStartingX = 0;
        break;
      default:
        throw 'Unsupported position';
    }
    switch (this.yAlign) {
      case 'TOP':
        newStartingY = 0;
        break;
      case 'CENTER':
        newStartingY = -desiredImage.height / 2;
        break;
      case 'BOTTOM':
        newStartingY = -desiredImage.height;
        break;
      default:
        throw 'Unsupported position';
    }
    ctx.translate(newStartingX, newStartingY);
  }
}
