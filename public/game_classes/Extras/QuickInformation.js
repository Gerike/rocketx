'use strict';

class QuickInformation extends Entity {
  constructor(linkedTo, informations) {
    super(linkedTo.getPosition());
    this.linkedTo = linkedTo;
    this.informations = informations;
    this.disableCollision();
    framework.attachEntity(this, linkedTo);
  }

  draw(ctx, position = this.linkedTo.getPosition()) {
    ctx.beginPath();
    let missing = 10;
    let height = Object.keys(this.informations).length * 10 + 10;
    let width = 60;
    let lineStart = new Position(position.getX() + this.linkedTo.getWidth(), position.getY() + this.linkedTo.getHeight());
    let lineEnd = new Position(lineStart.getX() + 5, lineStart.getY() + 10);
    ctx.strokeStyle = "#ffffff";

    ctx.moveTo(lineStart.getX(), lineStart.getY());
    ctx.lineTo(lineEnd.getX(), lineEnd.getY());

    ctx.lineTo(lineEnd.getX() + width, lineEnd.getY());
    ctx.lineTo(lineEnd.getX() + width, lineEnd.getY() + height - missing);

    ctx.moveTo(lineEnd.getX(), lineEnd.getY());
    ctx.lineTo(lineEnd.getX() - width, lineEnd.getY());
    ctx.moveTo(lineEnd.getX() - width, lineEnd.getY() + missing);
    ctx.lineTo(lineEnd.getX() - width, lineEnd.getY() + height);
    ctx.lineTo(lineEnd.getX() + width, lineEnd.getY() + height);

    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '10px Times New Roman';
    let index = 0;
    Object.entries(this.informations).forEach(([label, contextArguments]) => {
      ctx.fillText(`${label}: ${this._resolveContextArguments(contextArguments)}`, lineEnd.getX(), lineEnd.getY() + 12 + 10 * index++);
    });
  }

  _resolveContextArguments(contextArguments) {
    let args = contextArguments.split('.');
    let result = this.linkedTo;
    for (const ctx of args)
      result = result[ctx];
    return result;
  }
}
