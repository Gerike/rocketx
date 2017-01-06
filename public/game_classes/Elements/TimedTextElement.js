class TimedTextElement extends TimedElement{
  constructor(x, y, expirationChecker, text, font){
    super(x, y, expirationChecker);
    this.text = text;
    this.font = font;
  }

  _draw(ctx){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.font = this.font;
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, canvasWidth/2, canvasHeight/2);
  }
}
