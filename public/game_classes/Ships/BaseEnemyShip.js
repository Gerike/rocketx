class BaseEnemyShip extends SpaceShip {
  constructor(position, hp, image, path = null) {
    super(position, hp, image);
    this.path = path;
    if (this.path) this.waypoints = this.path.getWaypoints();
  }

  setPath(path) {
    this.path = path;
    this.waypoints = this.path.getWaypoints();
  }

  frame() {
    if (this.path !== null) {
      let nextWaypoint = this.waypoints.next();
      if (!nextWaypoint.done)
        this.position = nextWaypoint.value;
      else
        this.path = null;
    }
  }

  shoot() {
  }

  destroy() {
    framework.requestDestroy(this, 'Killed');
  }

  collided(object) {
    object.executeEffect(this);
    if (this.hp <= 0)
      this.destroy();
  }

  setSpeed(speed) {
    this.path.adjustSpeed(speed);
  }

  setTemporarySpeed(speed, frame) {
    this.path.adjustSpeed(speed, frame);
  }
}
