class Projectile{
  constructor(damage, img, x, y, direction, speed){
    this.damage = damage;
    this.img = img;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
  }
  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y);
  }
  frame(){
    switch(this.direction){
      case 0: this.y += this.speed; break;
      case 90: this.x += this.speed; break;
      case 180: this.y -= this.speed; break;
      case 270: this.x -= this.speed; break;
    }
  }
}
