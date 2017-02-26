'use strict';
class LinearPath extends Path {
  constructor(startPosition, speed, direction, length = undefined) {
    super(startPosition, speed);
    this.direction = direction;
    this.length = length;
    if (length) {
      this.endPosition = new Position(startPosition.getX() + Math.sin(this.direction * Math.PI / 180) * this.length, startPosition.getY() + Math.cos(this.direction * Math.PI / 180) * this.length * -1);
    }
  }

  _calculateNextWaypoint() {
    this._position.setPosition(
      this._position.getX() + Math.sin(this.direction * Math.PI / 180) * this.speed,
      this._position.getY() + Math.cos(this.direction * Math.PI / 180) * -1 * this.speed
    );
  }

  * getWaypoints() {
    if (this.length === undefined)
      while (true) {
        this._calculateNextWaypoint();
        yield this._position;
      }
    else
      while ((Math.abs(this._position.getX() - this.endPosition.getY()) > this.speed) || ((Math.abs(this._position.getY() - this.endPosition.getY()) > this.speed))) {
        this._calculateNextWaypoint();
        yield this._position;
      }
  }
}
