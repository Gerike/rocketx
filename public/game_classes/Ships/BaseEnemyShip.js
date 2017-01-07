/**
 * Created by Geri on 2016. 11. 15..
 */
class BaseEnemyShip extends SpaceShip {
  constructor(x, y, hp, img, path=null) {
    super(x, y, hp, img);
    this.path = path;
    if (this.path) this.waypoints = this.path.getWaypoints()
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame(){
    if (this.path !== null)
    {
      let next_waypoint = this.waypoints.next();
      if (!next_waypoint.done) {
        this.x = next_waypoint.value.x;
        this.y = next_waypoint.value.y;
      }
      else
        this.path = null;
    }
  }

  shoot(){}

  destroy(){
    framework.requestDestroy(this);
  }

  collided (object){
    object.executeEffect(this);
    if (this.hp <= 0)
      this.destroy();
  }

  setSpeed(speed){
    this.path.adjustSpeed(speed);
  }

  setTemporarySpeed(speed, frame){
    this.path.adjustSpeed(speed, frame)
  }
}
