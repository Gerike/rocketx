class ShootingPractice1 {
  constructor(framework) {
    this.framework = framework;
  }

  start() {
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Tutorial level", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.BOTTOM, 150), new FrameExpiration(200), "Shooting Practice 1", new TextStyle("25px Gerogia"), new FadeIn(50), new FadeOut(50)));

    this.enemiesDestroyed = 0;
    this.mustHaveDestroyed = 3;
    this.somebodyDied = new EventExpiration();

    this.framework.timer.delegateFrameEvent(() => {
      this.practice();
    }, 200);
  }

  restartPractice() {
    this.resetFramework();
    this.start();
  }

  resetFramework() {
    framework.entities = [];
    framework.elements = [];
    framework.frameEvents = [];
    framework.entityHandler.destroyListeners = [];
  }

  endPractice() {
    this.resetFramework();
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Well done!", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.timer.delegateFrameEvent(() => (level.nextStage()), 200);
  }

  practice() {
    this.resetFramework();


    let shootingTutorialExpiration = new EventExpiration();
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.LEFT, POSITIONS.Y.BOTTOM, 30), shootingTutorialExpiration, "Use the spacebar to shoot", new TextStyle("20px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new ImageElement(new ImagePosition(POSITIONS.X.RIGHT, POSITIONS.Y.BOTTOM, 15), shootingTutorialExpiration, resources['keyboard_space'], new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.TOP, 15), shootingTutorialExpiration, "Shooting practice", new TextStyle("30px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), this.somebodyDied, "Killed: " + this.enemiesDestroyed + " / " + this.mustHaveDestroyed, new TextStyle("20px Gerogia", "white")));

    framework.registerEntity(ShipFactory.createShip(600, 100, patterns.ships.BASE_ENEMY_SHIP));
    framework.registerEntity(ShipFactory.createShip(400, 200, patterns.ships.BASE_ENEMY_SHIP));
    framework.registerEntity(ShipFactory.createShip(600, 300, patterns.ships.BASE_ENEMY_SHIP));

    framework.entityHandler.addEventListener("destroy", this);
  }

  notify(entity) {
    if (entity.constructor.name === "BaseEnemyShip") {
      this.somebodyDied.fire();
      this.enemiesDestroyed++;
      if (this.enemiesDestroyed >= this.mustHaveDestroyed)
        this.endPractice();
      else
        framework.delegateFrameEvent(() => {
          this.somebodyDied = new EventExpiration();
          this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), this.somebodyDied, "Killed: " + this.enemiesDestroyed + " / " + this.mustHaveDestroyed, new TextStyle("20px Gerogia", "white")));
        }, 1);
    }
    else if (entity.constructor.name === "PlayerShip") {
      this.resetFramework();
      this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "You died", new TextStyle(), new FadeIn(50), new FadeOut(50)));
      framework.delegateFrameEvent(() => {
        this.restartPractice();
      }, 200)
    }
  }
}
