/**
 * Created by Geri on 2016. 11. 15..
 */
class BaseEnemyShip extends SpaceShip {
  constructor(x, y, img, weapons, extras, speed, path=null) {
    super(x, y, img);
    this.weapons = weapons;
    this.extras = extras;
    this.path = path
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame(){
    if (this.path !== null)
    {
      let next_waypoint = this.path.getWaypoint().next().value;
      this.x = next_waypoint.x;
      this.y = next_waypoint.y;
    }
  }

  shoot(){}

  collided (object){
    framework.requestDestroy(this);
  }
}
