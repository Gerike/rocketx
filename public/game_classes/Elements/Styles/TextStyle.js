class TextStyle {
  constructor(font = "60px Gerogia", color = "white") {
    this.font = font;
    this.color = color;
  }

  prepareContext(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
  }
}
