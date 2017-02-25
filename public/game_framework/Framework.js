'use strict';

class Framework {
  constructor(canvasHeight, canvasWidth, canvas) {
    this.CONSTANTS = {
      CANVAS_HEIGHT: canvasHeight,
      CANVAS_WIDTH: canvasWidth,
      CANVAS: canvas,
      CANVAS_CTX: canvas.getContext('2d')
    };

    this._pressedKeys = {};

    this.entityHandler = new EntityHandler();
    this.timeHandler = TimeHandler.getInstance();
    this.eventHandler = new EventHandler();
    this.hud = HUDHandler.getInstance();
    this.ready = false;
    this.levelPack = null;
    this.resources = [];
  }

  setup() {
    if (!this.ready) {
      let resourceLoader = new ResourceLoader();
      let loadingViewer = new LoadingViewer(this.CONSTANTS.CANVAS_CTX);

      let loader = resourceLoader.startLoad(this.levelPack.neededResources);
      loadingViewer.showProgressBarForPromises(loader);

      Promise.all(loader).then(() => {
        this.resources = resourceLoader.getResources();
        MaskHandler.getInstance().createStaticMasks(this.resources);
        $(document).on('keydown', (e) => {
          this.addKeyEventListeners();
          this.levelPack.start()
          step(); //TODO: MOVE IT FROM HERE
        });
      });

    }
  }

  loadLevelPack(levelPack) {
    this.ready = false;
    this.levelPack = levelPack;
    this.setup();
    this.ready = true;
  }

  addKeyEventListeners() {
    $(document).off();
    $(document).on('keydown', (e) => {
      e.preventDefault();
      this._pressedKeys[e.which] = true;
    });
    $(document).on('keyup', (e) => {
      e.preventDefault();
      this._pressedKeys[e.which] = false;
    });
  }

  render() {
    this.CONSTANTS.CANVAS_CTX.clearRect(0, 0, this.CONSTANTS.CANVAS_WIDTH, this.CONSTANTS.CANVAS_HEIGHT);
    for (const entity of this.entityHandler.getEntities())
      entity.draw(this.CONSTANTS.CANVAS_CTX);
  }

  frame() {
    this.timeHandler.step();
    this.entityHandler.executeEntityFrames();
  }


  isDown(key) {
    return this._pressedKeys[key];
  }

  step() {
    if (this.ready) {
      this.frame();
      this.render();

      this.hud.frame();
      this.hud.render();
    }
  }

  getEntities() {
    return this.entityHandler.getEntities();
  }

  getConstants() {
    return this.CONSTANTS;
  }

  getResources(){
    return this.resources;
  }

  registerEntity(entity){
    return this.entityHandler.registerEntity(entity);
  }

  resetFramework(){
    this.entityHandler.resetEntities();
    this.hud.resetHUD();
    this.timeHandler.resetEvents();
    this.eventHandler.resetEventSubscriptions();
  }

  addEventListener(event, object){
    this.eventHandler.addEventListener(event, object);
  }

  registerEvent(event, object){
    this.eventHandler.registerEvent(event, object);
  }

  requestDestroy(entity, reason){
    this.entityHandler.requestDestroy(entity, reason);
  }
}
