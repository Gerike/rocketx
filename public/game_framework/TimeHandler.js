'use strict';

class TimeHandler {
  constructor() {
    if (TimeHandler.prototype._singletonInstance)
      return TimeHandler.prototype._singletonInstance;

    this._frameEvents = [];
    this._frameIndex = 0;

    TimeHandler.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new TimeHandler();
  }

  step() {
    this._frameIndex += 1;
    this.executeEvents();
    this.deleteExecutedEvents();
  }

  isFramePassed(frame) {
    return (frame <= this._frameIndex);
  }

  getCurrentFrameIndex() {
    return this._frameIndex;
  }

  delegateFrameEvent(callback, frame) {
    this._frameEvents.push({
      activationFrame: this._frameIndex + frame,
      execute: callback
    });
  }

  deleteExecutedEvents() {
    this._frameEvents = this._frameEvents.filter((event) => {
      return !this.isFramePassed(event.activationFrame)
    }); //TODO: Do the deletion when the frameEvent fires, now iterating throught the array twice
  }

  executeEvents() {
    for (const event of this._frameEvents) {
      if (this.isFramePassed(event.activationFrame))
        event.execute();
    }
  }

  resetEvents(){
    this._frameEvents = [];
  }
}
