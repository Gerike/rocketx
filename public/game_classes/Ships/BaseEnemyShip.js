class BaseEnemyShip extends SpaceShip {
  constructor(position, hp, image, path = null) {
    super(position, hp, image);
    this._path = path;
    if (this._path) this._waypoints = this._path.getWaypoints();
  }

  setPath(path) {
    this._path = path;
    this._waypoints = this._path.getWaypoints();
  }

  frame() {
    if (this._path !== null) {
      let nextWaypoint = this._waypoints.next();
      if (!nextWaypoint.done)
        this._position = nextWaypoint.value;
      else
        this._path = null;
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
    this._path.adjustSpeed(speed);
  }

  setTemporarySpeed(speed, frame) {
    this._path.adjustSpeed(speed, frame);
  }
}
