'use strict';

class EntityHandler {
  constructor(k) {
    this._entities = [];
    this._registeredEntities = 0;
    this._maskHandler = MaskHandler.getInstance();
    this._eventHandler = EventHandler.getInstance();
    this._collisionHandler = new CollisionHandler();
  }

  getEntities() {
    return this._entities;
  }

  manageEntities(){
    this.sanityDeleteEntities();
    this._collisionHandler.handleCollisions(this._entities);
  }

  addUniqueKey(entity) { //TODO: MAYBE USE WRAPPER?
    entity._entityID = this._registeredEntities;
    this._registeredEntities++;
  }

  registerEntity(entity) {
    this.addUniqueKey(entity);
    this._entities.push(entity);

    if (entity.hasDynamicMask)
      this._maskHandler._createDynamicMask(entity);
    return entity;
  }

  outOfCanvas(entity) {
    if ((entity.getPosition().getX() < 0 - entity.img.width) || (entity.getPosition().getX() > framework.getConstants().CANVAS_WIDTH + entity.img.width) || (entity.getPosition().getY() < 0 - entity.img.height) || (entity.getPosition().getY() > framework.getConstants().CANVAS_HEIGHT + entity.img.height))
      return true;
    return false;
  }

  sanityDeleteEntities() {
    for (const entity of this._entities) {
      if (this.outOfCanvas(entity))
        this.requestDestroy(entity, 'Out of bounds');
    }
  }

  requestDestroy(entity, reason) {
    this._eventHandler.registerEvent('destroy', entity, reason);
    this._maskHandler.deleteMask(entity);
    this._entities.splice(this._entities.indexOf(entity), 1);
  }

  executeEntityFrames() {
    for (const entity of this._entities) {
      entity.frame();
    }

    this.manageEntities();
  }

  getFirstCollideEntity(fromEntity) {
    let minX = fromEntity.img.width;
    for (const entity of this._entities) {
      if (entity.constructor.name !== fromEntity.constructor.name) {
        if (this._collisionHandler.isPixelCollision(this._maskHandler.getMask(entity), entity.getPosition(), this._maskHandler.getMask(fromEntity, true), fromEntity.getPosition())) {
          if (minX > entity.getPosition().getX() - fromEntity.getPosition().getX()) {
            minX = entity.getPosition().getX() - fromEntity.getPosition().getX();
          }
        }
      }
    }
    return minX;
  }

  resetEntities(){
    this._entities = [];
  }
}
