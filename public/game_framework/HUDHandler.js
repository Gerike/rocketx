'use strict';

class HUDHandler {
  constructor() {
    if (HUDHandler.prototype._singletonInstance)
      return HUDHandler.prototype._singletonInstance;
    this._elements = [];
    this._elementsChanged = false;
    this._canvas = document.getElementById('special_messages');
    this._canvasCtx = this._canvas.getContext('2d');
    HUDHandler.prototype._singletonInstance = this;
  }

  static getInstance(){
    return new HUDHandler();
  }

  addElement(element) {
    this._elements.push(element);
    this.markElementsAsChanged();
  }

  frame() {
    this._clearExpired();
  }

  markElementsAsChanged() {
    this._elementsChanged = true;
  }

  render(forced = false) {
    if (this._elementsChanged || forced) {
      this._elementsChanged = false;
      this._canvasCtx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      for (const element of this._elements)
        element.draw(this._canvasCtx);
    }
  }

  _clearExpired() {
    for (const element of this._elements) {
      if (element.isExpired())
        this.removeElement(element);
    }
  }

  removeElement(element) {
    this._elements.splice(this._elements.indexOf(element), 1);
    this.markElementsAsChanged();
  }

  resetHUD(){
    this._elements = [];
    this._elementsChanged = true;
  }
}
