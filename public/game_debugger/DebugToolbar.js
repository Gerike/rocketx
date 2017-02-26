class DebugToolbar {
  constructor(){
    this.logger = Logger.getInstance();
    this.contextMenu = ContextMenu.getInstance();
    this.logger.debug('' +
      'RocketX Debug Toolbar Activated\n' +
      'The list of functions you can use currently:\n' +
      ' - Left click on the game and list the entities under your cursor\n' +
      ' - Left click on an element and drag them to another position, the game will stop, so dont worry about colliding\n'+
      ' - Right click to bring a context menu front where you can select multiple options:\n' +
      ' -- Pause the game (the game automatically pauses / continues if you show / hide the context menu, except if you pause this way)\n'+
      ' -- Add a PlayerShip to the game if it does not exist',
      ' -- Add a new BaseEnemyShip to the game without path\n' +
      ' -- Delete entities under your cursor\n' +
      ' -- Reset the framework, deleting every event and entity'
    );
  }
}
