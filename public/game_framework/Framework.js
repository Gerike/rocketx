'use strict';

class Framework {
  constructor(canvasHeight, canvasWidth, canvas) {
    this.CONSTANTS = {
      CANVAS_HEIGHT: canvasHeight,
      CANVAS_WIDTH: canvasWidth,
      CANVAS: canvas
    };

    this._pressedKeys = {};

    this.entityHandler = new EntityHandler();
    this.timeHandler = TimeHandler.getInstance();
    this.eventHandler = new EventHandler();
    this.hud = HUDHandler.getInstance();
    this._ready = false;
    this._levelPack = null;
    this._resources = [];
  }

  _setup() {
    if (!this._ready) {
      let resourceLoader = new ResourceLoader();
      let loadingViewer = new LoadingViewer(this.CONSTANTS.CANVAS.getContext('2d'));

      let loader = resourceLoader.startLoad(this._levelPack.neededResources);
      loadingViewer.showProgressBarForPromises(loader);

      Promise.all(loader).then(() => {
        this._resources = resourceLoader.getResources();
        MaskHandler.getInstance().createStaticMasks(this._resources);
        $(document).on('keydown', () => {
          this._addKeyEventListeners();
          this._levelPack.start();
          step(); //TODO: MOVE IT FROM HERE
        });
      });

    }
  }

  loadLevelPack(levelPack) {
    this._ready = false;
    this._levelPack = levelPack;
    this._setup();
    this._ready = true;
  }

  _addKeyEventListeners() {
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

  _render() {
    this.CONSTANTS.CANVAS.getContext('2d').clearRect(0, 0, this.CONSTANTS.CANVAS_WIDTH, this.CONSTANTS.CANVAS_HEIGHT);
    for (const entity of this.entityHandler.getEntities()){
      entity.draw(this.CONSTANTS.CANVAS.getContext('2d'));
    }
  }

  _frame() {
    this.timeHandler.step();
    this.entityHandler.executeEntityFrames();
  }


  isDown(key) {
    return this._pressedKeys[key];
  }

  _step() {
    if (this._ready) {
      this._frame();
      this._render();

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

  getResources() {
    return this._resources;
  }

  registerEntity(entity) {
    return this.entityHandler.registerEntity(entity);
  }

  resetFramework() {
    this.entityHandler.resetEntities();
    this.hud.resetHUD();
    this.timeHandler.resetEvents();
    this.eventHandler.resetEventSubscriptions();
  }

  addEventListener(event, object) {
    this.eventHandler.addEventListener(event, object);
  }

  registerEvent(event, object) {
    this.eventHandler.registerEvent(event, object);
  }

  requestDestroy(entity, reason) {
    this.entityHandler.requestDestroy(entity, reason);
  }

  getFirstCollideEntity(entity) {
    return this.entityHandler.getFirstCollideEntity(entity);
  }

  attachEntity(entity, attachedTo){
    this.entityHandler.attachEntity(entity, attachedTo);
  }
}
