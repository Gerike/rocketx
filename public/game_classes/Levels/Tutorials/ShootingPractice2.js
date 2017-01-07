class ShootingPractice2 {
  constructor(framework) {
    this.framework = framework;
  }

  start() {
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Tutorial level", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.BOTTOM, 150), new FrameExpiration(200), "Shooting Practice 2", new TextStyle("25px Gerogia"), new FadeIn(50), new FadeOut(50)));

    this.enemiesDestroyed = 0;
    this.mustHaveDestroyed = 6;
    this.somebodyDied = new EventExpiration();

    this.framework.timer.delegateFrameEvent(() => {
      this.practice();
    }, 200);
  }

  restartPractice() {
    this.resetFramework();
    framework.entityHandler.eventSubscribers = {};
    this.start();
  }

  resetFramework() {
    framework.entities = [];
    framework.elements = [];
    framework.frameEvents = [];
  }

  endPractice() {
    this.resetFramework();
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "Well done!", new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.framework.timer.delegateFrameEvent(() => (level.nextStage()), 200);
  }

  createEnemyShip(){
    let ship = framework.registerEntity(ShipFactory.createShip(800, Math.random()*300, patterns.ships.BASE_ENEMY_SHIP));
    let lp = new LinearPath(ship.x, ship.y, 270, 1);
    ship.setPath(lp);
  }

  practice() {
    this.resetFramework();

    let shootingTutorialExpiration = new EventExpiration();
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.LEFT, POSITIONS.Y.BOTTOM, 30), shootingTutorialExpiration, "Kill all enemies before they escape", new TextStyle("20px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.TOP, 15), shootingTutorialExpiration, "Shooting practice", new TextStyle("30px Gerogia", "white"), new FadeIn(50), new FadeOut(50)));
    this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), this.somebodyDied, "Killed: " + this.enemiesDestroyed + " / " + this.mustHaveDestroyed, new TextStyle("20px Gerogia", "white")));

    for(let i = 0; i < this.mustHaveDestroyed; i++)
      framework.timer.delegateFrameEvent(() => {this.createEnemyShip();}, (i+1)*60);

    framework.entityHandler.addEventListener("destroy", this);
  }

  notify(entity) {
    if (entity.constructor.name === "BaseEnemyShip") {
      this.somebodyDied.fire();
      this.enemiesDestroyed++;
      if (this.enemiesDestroyed >= this.mustHaveDestroyed)
        this.endPractice();
      else if (!framework.entityHandler.outOfCanvas(entity))
        framework.delegateFrameEvent(() => {
          this.somebodyDied = new EventExpiration();
          this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 30), this.somebodyDied, "Killed: " + this.enemiesDestroyed + " / " + this.mustHaveDestroyed, new TextStyle("20px Gerogia", "white")));
        }, 1);
      else{
        this.resetFramework();
        this.framework.drawer.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), "A ship escaped", new TextStyle(), new FadeIn(50), new FadeOut(50)));
        framework.delegateFrameEvent(() => {
          this.restartPractice();
        }, 200)
      }
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
