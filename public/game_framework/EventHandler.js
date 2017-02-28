'use strict';

class EventHandler {
  constructor() {
    if (EventHandler.prototype._singletonInstance)
      return EventHandler.prototype._singletonInstance;

    this.eventSubscribers = {};
    this.logger = null;
    EventHandler.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new EventHandler();
  }

  setLogger(logger){
    this.logger = logger;
  }

  registerEvent(event, object, reason) {
    if(this.logger)
      this.logger.info(event, object, reason, this.eventSubscribers[event]);
    if (this.eventSubscribers[event])
      for (const subscriber of this.eventSubscribers[event]) {
        subscriber.notify(object, event, reason);
      }
  }

  addEventListener(event, object) {
    if (event in this.eventSubscribers)
      this.eventSubscribers[event].push(object);
    else
      this.eventSubscribers[event] = [object];
  }

  resetEventSubscriptions() {
    this.eventSubscribers = {};
  }
}
