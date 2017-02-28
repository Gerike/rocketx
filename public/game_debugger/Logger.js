const LOGGING_LEVEL = {
  NONE: 0,
  ERROR: 1,
  DEBUG: 2,
  INFO: 3,
  ALL: 4
};

class Logger {
  constructor() {
    if (Logger.prototype._singletonInstance)
      return Logger.prototype._singletonInstance;

    this.loggingLevel = LOGGING_LEVEL.INFO;
    this.infoEventFilter = null;
    EventHandler.getInstance().setLogger(this);

    window.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
      this._handleEvent(LOGGING_LEVEL.ERROR, errorMsg, errorObj);
      return true;
    };

    Logger.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new Logger();
  }

  setLoggingLevel(loggingLevel) {
    this.loggingLevel = loggingLevel;
  }

  setInfoEventFilter(infoEventFilter) {
    this.infoEventFilter = infoEventFilter.toLowerCase();
  }

  _handleEvent(loggingLevel, information, informationObject) {
    if (loggingLevel <= this.loggingLevel) {
      switch (loggingLevel) {
        case 1:
          this._prettyPrintError(information, informationObject);
          break;
        case 2:
          this._prettyPrintDebug(information, informationObject);
          break;
        case 3:
          if (information.toLocaleLowerCase().includes(this.infoEventFilter))
            this._prettyPrintInfo(information, informationObject);
          break;
        default:
          this._prettyPrint(information, console.log, informationObject);
          break;
      }
    }
  }

  error(errorMsg, errorObj) {
    this._handleEvent(LOGGING_LEVEL.ERROR, errorMsg, errorObj);
  }

  debug(debugMessage, debugObject) {
    this._handleEvent(LOGGING_LEVEL.DEBUG, debugMessage, debugObject);
  }

  info(event, object, reason, subscribers) {
    this._handleEvent(LOGGING_LEVEL.INFO, event, {sender: object, reason: reason, subscribers: subscribers});
  }

  async _prettyPrintError(errorMessage, stackTrace) {
    console.error(
      '%cRocketX Error Report:\n', 'font-size: 20px',
      'Error: ', errorMessage, '\n',
      'Stack Trace: ', stackTrace, '\n\n',
      'State of the memory before the error:\n',
      '--Current frame: ', TimeHandler.getInstance().getCurrentFrameIndex(), '\n',
      '--Player: ', framework.getEntities()[0], '\n',
      '--Entities in the memory: ', framework.getEntities(), '\n',
      '--Scheduled Frame Events: ', TimeHandler.getInstance()._frameEvents,
      '\n\nTips to solve the problem:', await TipsContainer.getInstance().getTips(stackTrace.stack.toString()),
      '\n\nUse the step() command to restart the framework event loop, after you fixed the bug.');
  }

  _prettyPrintInfo(eventName, eventInformation) {
    console.info(
      eventName, 'event happened:\n',
      '--Sender: ', eventInformation.sender, '\n',
      '--Reason: ', eventInformation.reason, '\n',
      '--Subscribers to this event:', eventInformation.subscribers
    );
  }

  _prettyPrintDebug(debugInfo, debugObjects) {
    if (debugObjects)
      console.warn(debugInfo, ': ', debugObjects);
    else
      console.warn(debugInfo);
  }

  _prettyPrint(information, output, object) {
    if (object)
      output('RocketX Logger:\n', information, '\n', object);
    else
      output('RocketX Logger:\n', information);
  }
}

