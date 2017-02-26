const LOGGING_LEVEL = {
  IGNORE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3
};

class Logger {
  constructor() {
    this.loggingLevel = LOGGING_LEVEL.IGNORE;
  }

  setLoggingLevel(loggingLevel) {
    this.loggingLevel = loggingLevel;
  }

  _handleLog(information, level) {
    if (level <= this.loggingLevel) {
      switch (level) {
        case 1 :
          console.error(information);
          break;
        case 2:
          console.warn(information);
          break;
        case 3:
          console.info(information);
          break;
        default:
          console.log(information);
          break;
      }
    }
  }

  error(error) {
    this._handleLog(error, LOGGING_LEVEL.ERROR);
  }

  warn(warning) {
    this._handleLog(warning, LOGGING_LEVEL.WARN);
  }

  info(information) {
    this._handleLog(information, LOGGING_LEVEL.INFO);
  }

}
