class Position {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setX(x) {
    this._x = x;
  }

  setY(y) {
    this._y = y;
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }
}
