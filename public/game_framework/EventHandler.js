'use strict';

class EventHandler {
  constructor() {
    if (EventHandler.prototype._singletonInstance)
      return EventHandler.prototype._singletonInstance;

    this.eventSubscribers = {};
    EventHandler.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new EventHandler();
  }

  registerEvent(event, object) {
    if (framework.entityHandler.eventSubscribers[event])
      for (let i = 0; i < framework.entityHandler.eventSubscribers[event].length; i++) {
        framework.entityHandler.eventSubscribers[event][i].notify(object, event);
      }
  }

  addEventListener(event, object) {
    if (event in framework.entityHandler.eventSubscribers)
      framework.entityHandler.eventSubscribers[event].push(object);
    else
      framework.entityHandler.eventSubscribers[event] = [object];
  }
}
