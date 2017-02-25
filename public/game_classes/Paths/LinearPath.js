'use strict';
class LinearPath extends Path {
  constructor(startPosition, direction, speed, length = undefined) {
    super(startPosition, speed);
    this.direction = direction;
    this.length = length;
    if (length) {
      this.endPosition = new Position(startPosition.getX() + Math.sin(this.direction * Math.PI / 180) * this.length, startPosition.getY() + Math.cos(this.direction * Math.PI / 180) * this.length * -1);
    }
  }

  _calculateNextWaypoint() {
    this.position.setPosition(
      this.position.getX() + Math.sin(this.direction * Math.PI / 180) * this.speed,
      this.position.getY() + Math.cos(this.direction * Math.PI / 180) * -1 * this.speed
    );
  }

  * getWaypoints() {
    if (this.length === undefined)
      while (true) {
        this._calculateNextWaypoint();
        yield this.position;
      }
    else
      while ((Math.abs(this.position.getX() - this.endPosition.getY()) > this.speed) || ((Math.abs(this.position.getY() - this.endPosition.getY()) > this.speed))) {
        this._calculateNextWaypoint();
        yield this.position;
      }
  }
}
