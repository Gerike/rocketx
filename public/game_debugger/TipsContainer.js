class TipsContainer {
  constructor() {
    if (TipsContainer.prototype._singletonInstance)
      return TipsContainer.prototype._singletonInstance;
    TipsContainer.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new TipsContainer();
  }

  prettifyTips(tips) {
    let prettifiedTips = "";
    for (let tip of tips) {
      prettifiedTips = prettifiedTips.concat('\n - ', tip);
    }
    return prettifiedTips;
  }

  getTips(substring) {
    return new Promise((resolve, reject) => {
      $.getJSON("/game_debugger/tips.json", (json) => {
        let relevantTips = [];
        for (const error of Object.keys(json)) {
          if (substring.includes(error))
            relevantTips.push(json[error]);
        }
        relevantTips = this.prettifyTips(relevantTips);
        resolve(relevantTips);
      });
    });
  }
}
