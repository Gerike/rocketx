class MovingPractice {
  constructor(framework) {
    this.framework = framework;
  }

  start() {
    this.resetFramework();
    framework.entityHandler.eventSubscribers = {};
    
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Tutorial level", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.BOTTOM, 150), new FrameExpiration(200), "Moving practice", new TextStyle("25px Gerogia"), new FadeIn(50), new FadeOut(50)));

    this.framework.timer.delegateFrameEvent(() => {
      this.practice();
    }, 200);
  }

  resetFramework() {
    framework.entities = [];
    framework.elements = [];
    framework.frameEvents = [];
    framework.entityHandler.eventSubscribers = {};
  }

  isPlayerMoving() {
    return (framework.isDown(37) || framework.isDown(38) || framework.isDown(39) || framework.isDown(40))
  }

  endPractice() {
    this.resetFramework();
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Well done!", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.timer.delegateFrameEvent(() => (level.nextStage()), 200);
  }

  practice() {
    this.resetFramework();
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [], []));
    let movingTutorialExpiration = new EventExpiration();
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.LEFT, POSITIONS.Y.BOTTOM, 30), movingTutorialExpiration, "Use the arrow buttons to move your ship", new TextStyle("20px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new ImageElement(new ImagePosition(POSITIONS.X.RIGHT, POSITIONS.Y.BOTTOM, 15), movingTutorialExpiration, resources['keyboard_arrows'], new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.TOP, 15), movingTutorialExpiration, "Moving practice", new TextStyle("30px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));

    let secondsMoving = 0;
    let mustHaveMoving = 10;
    let waiting = false;
    let playerMoved = new EventExpiration();

    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), playerMoved, "Moving: " + secondsMoving + " / " + mustHaveMoving, new TextStyle("20px Gerogia", "white")));
    let checker = setInterval(() => {
      if (secondsMoving >= mustHaveMoving) {
        clearInterval(checker);
        this.endPractice();
      }
      else if (this.isPlayerMoving() && !waiting) {
        framework.timer.delegateFrameEvent(() => {
          waiting = false;
        }, 60);
        secondsMoving++;
        waiting = true;
        playerMoved.fire();
        framework.timer.delegateFrameEvent(() => {
          playerMoved = new EventExpiration();
          this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), playerMoved, "Moving: " + secondsMoving + " / " + mustHaveMoving, new TextStyle("20px Gerogia", "white")));
        }, 1);
      }
    }, 100)
  }
}
