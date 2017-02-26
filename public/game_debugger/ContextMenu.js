const DEBUG_MENU_OPTIONS = {
  PAUSE : 0,
  ADD_PLAYER : 1,
  ADD_ENEMY : 2,
  DELETE_ENTITIES : 3,
  RESET_FRAMEWORK : 4
};

class ContextMenu {
  constructor() {
    if (ContextMenu.prototype._singletonInstance)
      return ContextMenu.prototype._singletonInstance;
    this.forcePause = false;
    this.createContextMenu();
    this.setupEventListener();
    ContextMenu.prototype._singletonInstance = this;
  }

  static getInstance() {
    return new ContextMenu();
  }


  createContextMenuButton(type) {
    let menuButton;
    switch (type) {
      case 0:
        menuButton = $('<a href="#"><li>Pause</li></a>');
        menuButton.on('click', (e) => {
          this.pauseGame(e);
          this.hideContextMenu();
        });
        break;

      case 1:
        menuButton = $('<a href="#"><li>Add Player Ship</li></a>');
        menuButton.on('click', (e) => {
          this.addPlayerShip(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top')));
          this.hideContextMenu();
        });
        break;

      case 2:
        menuButton = $('<a href="#"><li>Add Enemy Ship</li></a>');
        menuButton.on('click', (e) => {
          this.addNewShip(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top')));
          this.hideContextMenu();
        });
        break;

      case 3:
        menuButton = $('<a href="#"><li>Delete entities under the cursor</li></a>');
        menuButton.on('click', (e) => {
          this.deleteEntities(this.locateEntityUnderClick(parseInt(this.contextMenu.css('left')), parseInt(this.contextMenu.css('top'))));
          this.hideContextMenu();
        });
        break;

      case 4:
        menuButton = $('<a href="#"><li>Reset framework</li></a>');
        menuButton.on('click', (e) => {
          framework.resetFramework();
          this.hideContextMenu();
        });
        break;


    }
    return menuButton;
  }


  pauseGame(e) {
    if (this.forcePause) {
      this.forcePause = false;
      e.target.innerHTML = 'Pause';
    }
    else {
      this.forcePause = true;
      e.target.innerHTML = 'Continue';
    }
  }

  createContextMenu() {
    this.contextMenu = $('<div class="menu"></div>');
    $('.game_field').append(this.contextMenu);
    this.contextMenuList = $('<ul></ul>');
    this.contextMenu.append(this.contextMenuList);
  }

  fillContextMenu(e){
    this.contextMenuList[0].innerHTML = '';
    let menuOptions = [];

    menuOptions.push(DEBUG_MENU_OPTIONS.PAUSE);

    if(!this.isPlayerShipPresent())
      menuOptions.push(DEBUG_MENU_OPTIONS.ADD_PLAYER);

    menuOptions.push(DEBUG_MENU_OPTIONS.ADD_ENEMY);

    if(this.locateEntityUnderClick(e.offsetX, e.offsetY).length > 0)
      menuOptions.push(DEBUG_MENU_OPTIONS.DELETE_ENTITIES);

    menuOptions.push(DEBUG_MENU_OPTIONS.RESET_FRAMEWORK);

    for (const menuPoint of menuOptions){
      this.contextMenuList.append(this.createContextMenuButton(menuPoint));
    }
  }

  isPlayerShipPresent(){
    for(const entity of framework.getEntities()){
      if (entity.constructor.name === 'PlayerShip')
        return true;
    }
    return false;
  }

  showContextMenu(e) {
    stop();
    let menu = $(".menu");
    menu.hide();

    let pageX = e.offsetX;
    let pageY = e.offsetY;

    menu.css({top: pageY, left: pageX});
    menu.show();
  }


  hideContextMenu(e) {
    let menu = $(".menu").hide();
    if (!this.forcePause)
      cont();
  }

  addNewShip(x, y) {
    let ship = ShipFactory.createShip(x, y, patterns.ships.BASE_ENEMY_SHIP);
    framework.registerEntity(ship);
  }


  deleteEntities(entities) {
    for (const entity of entities) {
      framework.requestDestroy(entity);
    }
  }

  locateEntityUnderClick(x, y) {
    let entities = [];

    for (const entity of framework.getEntities()) {
      if (entity.getPosition().getX() <= x && entity.getPosition().getY() <= y && entity.getPosition().getX() + entity.getImage().width >= x && entity.getPosition().getY() + entity.getImage().height >= y)
        entities.push(entity);
    }

    return entities;
  }

  moveEntities(entities, x, y) {
    for (const entity of entities) {
      entity.getPosition().setPosition(x, y);
    }
    framework._render();
  }

  addPlayerShip(x, y) {
    let playerShip = ShipFactory.createShip(x, y, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]);
    framework.registerEntity(playerShip);
  }

  setupEventListener() {
    $('#game_canvas').on('contextmenu', (e) => {
      e.preventDefault();
      this.fillContextMenu(e);
      this.showContextMenu(e);
    });
    $('#game_canvas').mousedown((e) => {
      switch (e.which) {
        case 1:
          e.preventDefault();
          this.mouseUnderEntities = this.locateEntityUnderClick(e.offsetX, e.offsetY);
          if (this.mouseUnderEntities.length > 0) {
            Logger.getInstance().debug('Entities under the cursor', this.mouseUnderEntities);
            $('#game_canvas').mousemove((e) => {
              stop();
              this.moveEntities(this.mouseUnderEntities, e.offsetX, e.offsetY);
            });
          }

        this.hideContextMenu(e);
        break;

      }
    });
    $('#game_canvas').mouseup((e) => {
      $('#game_canvas').off("mousemove");
      if (!this.forcePause)
        cont();
    });
  }

}
