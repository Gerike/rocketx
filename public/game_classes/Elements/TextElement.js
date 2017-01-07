class TextElement extends Element {
  constructor(position, expirationChecker, text, font = "60px Georgia", color = "white") {
    super(position, expirationChecker);
    this.text = text;
    this.font = font;
    this.color = color;
  }

  _draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    this.position.prepareContext(ctx);
    ctx.fillText(this.text, this.position.getX(), this.position.getY());
  }
}
