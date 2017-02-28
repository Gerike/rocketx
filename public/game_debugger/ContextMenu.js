const DEBUG_MENU_OPTIONS = {
  PAUSE: 0,
  ADD_PLAYER: 1,
  ADD_ENEMY: 2,
  DELETE_ENTITIES: 3,
  RESET_FRAMEWORK: 4
};

class ContextMenu {
  constructor() {
    if (ContextMenu.prototype._singletonInstance)
      return ContextMenu.prototype._singletonInstance;
    this.forcePause = false;
    this._createContextMenu();
    this._setupEventListener();
    ContextMenu.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new ContextMenu();
  }

  _createContextMenuButton(type) {
    let menuButton;
    switch (type) {
      case 0:
        if (this.forcePause)
          menuButton = $('<a href="#"><li>Continue</li></a>');
        else
          menuButton = $('<a href="#"><li>Pause</li></a>');
        menuButton.on('click', (e) => {
          this._pauseGame(e);
          this._hideContextMenu();
        });
        break;

      case 1:
        menuButton = $('<a href="#"><li>Add Player Ship</li></a>');
        menuButton.on('click', (e) => {
          this._addPlayerShip(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top')));
          this._hideContextMenu();
        });
        break;

      case 2:
        menuButton = $('<a href="#"><li>Add Enemy Ship</li></a>');
        menuButton.on('click', (e) => {
          this._addNewShip(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top')));
          this._hideContextMenu();
        });
        break;

      case 3:
        menuButton = $('<a href="#"><li>Delete entities under the cursor</li></a>');
        menuButton.on('click', (e) => {
          this._deleteEntities(this._locateEntitiesUnderClick(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top'))));
          this._hideContextMenu();
        });
        break;

      case 4:
        menuButton = $('<a href="#"><li>Reset framework</li></a>');
        menuButton.on('click', (e) => {
          framework.resetFramework();
          this._hideContextMenu();
        });
        break;
    }
    return menuButton;
  }


  _pauseGame(e) {
    this.forcePause = (this.forcePause) ? false : true;
  }

  _createContextMenu() {
    this.contextMenu = $('<div class="menu"></div>');
    $('.game_field').append(this.contextMenu);
    this.contextMenuList = $('<ul></ul>');
    this.contextMenu.append(this.contextMenuList);
  }

  _chooseOptionalContextMenuOptions(e, menuOptions) {
    if (!this._isPlayerShipAlive())
      menuOptions.push(DEBUG_MENU_OPTIONS.ADD_PLAYER);

    if (this._locateEntitiesUnderClick(e.offsetX, e.offsetY).length > 0)
      menuOptions.push(DEBUG_MENU_OPTIONS.DELETE_ENTITIES);
  }

  _updateContextMenu(e) {
    this.contextMenuList.empty();
    let menuOptions = [];

    menuOptions.push(DEBUG_MENU_OPTIONS.PAUSE);
    menuOptions.push(DEBUG_MENU_OPTIONS.ADD_ENEMY);
    menuOptions.push(DEBUG_MENU_OPTIONS.RESET_FRAMEWORK);

    this._chooseOptionalContextMenuOptions(e, menuOptions);

    for (const menuPoint of menuOptions) {
      this.contextMenuList.append(this._createContextMenuButton(menuPoint));
    }
  }

  _isPlayerShipAlive() {
    for (const entity of framework.getEntities()) {
      if (entity.constructor.name === 'PlayerShip')
        return true;
    }
    return false;
  }

  _showContextMenu(e) {
    let menu = $(".menu");
    let pageX = e.offsetX;
    let pageY = e.offsetY;

    pauseGame();
    menu.css({top: pageY, left: pageX});
    menu.show();
  }


  _hideContextMenu(e) {
    let menu = $(".menu").hide();
    if (!this.forcePause)
      continueGame();
  }

  _addNewShip(x, y) {
    let ship = ShipFactory.createShip(x, y, patterns.ships.BASE_ENEMY_SHIP);
    framework.registerEntity(ship);
  }


  _deleteEntities(entities) {
    for (const entity of entities) {
      framework.requestDestroy(entity);
    }
  }

  _locateEntitiesUnderClick(x, y) {
    let entities = [];

    for (const entity of framework.getEntities()) {
      if (entity.getPosition().getX() <= x && entity.getPosition().getY() <= y && entity.getPosition().getX() + entity.getImage().width >= x && entity.getPosition().getY() + entity.getImage().height >= y)
        entities.push(entity);
    }

    return entities;
  }

  _moveEntities(entities, x, y) {
    for (const entity of entities) {
      entity.getPosition().setPosition(x, y);
    }
  }

  _addPlayerShip(x, y) {
    let playerShip = ShipFactory.createShip(x, y, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]);
    framework.registerEntity(playerShip);
  }

  activateEntityDragging() {
    $('#game_canvas').mousemove((e) => {
      pauseGame();
      this._moveEntities(this.mouseUnderEntities, e.offsetX, e.offsetY);
    });
  }

  _logEntitiesUnderMouse(e) {
    this.mouseUnderEntities = this._locateEntitiesUnderClick(e.offsetX, e.offsetY);
    if (this.mouseUnderEntities.length > 0)
      Logger.getInstance().debug('Entities under the cursor', this.mouseUnderEntities);
  }

  _disableEntityDragging() {
    $('#game_canvas').off("mousemove");
  }

  _setupEventListener() {
    $('#game_canvas').on('contextmenu', (e) => {
      e.preventDefault();
      this._updateContextMenu(e);
      this._showContextMenu(e);
    });

    $('#game_canvas').on('mousedown', (e) => {
      e.preventDefault();
      this._hideContextMenu(e);
      this._logEntitiesUnderMouse(e);
      this.activateEntityDragging();

    });
    $('#game_canvas').mouseup(() => {
      this._disableEntityDragging();
      if (!this.forcePause)
        continueGame();
    });
  }
}
