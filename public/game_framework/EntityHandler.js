'use strict';

class EntityHandler {
  constructor() {
    this._entities = [];
    this._attachedEntities = {};
    this._registeredEntities = 0;
    this._maskHandler = MaskHandler.getInstance();
    this._eventHandler = EventHandler.getInstance();
    this._collisionHandler = new CollisionHandler();
  }

  getEntities() {
    return this._entities;
  }

  _manageEntities() {
    this._sanityDeleteEntities();
    this._collisionHandler.handleCollisions(this._entities);
  }

  _addUniqueKey(entity) { //TODO: MAYBE USE WRAPPER?
    entity._entityID = this._registeredEntities;
    this._registeredEntities++;
  }

  registerEntity(entity) {
    this._addUniqueKey(entity);
    this._entities.push(entity);

    if (entity.hasDynamicMask)
      this._maskHandler._createDynamicMask(entity);
    return entity;
  }

  attachEntity(entity, attachedTo) {
    entity = this.registerEntity(entity);

    if (Object.keys(this._attachedEntities).includes(attachedTo._entityID.toString()))
      this._attachedEntities[attachedTo._entityID].push(entity);
    else
      this._attachedEntities[attachedTo._entityID] = [entity];
    return entity;
  }

  destroyAttachedEntities(entity, reason) {
    if (Object.keys(this._attachedEntities).includes(entity._entityID.toString()))
      for (const e of this._attachedEntities[entity._entityID])
        this.requestDestroy(e, reason);
  }

  outOfCanvas(entity) {
    if (entity.getImage() && (entity.getPosition().getX() < 0 - entity.getImage().width) || (entity.getPosition().getX() > framework.getConstants().CANVAS_WIDTH + entity.getImage().width) || (entity.getPosition().getY() < 0 - entity.getImage().height) || (entity.getPosition().getY() > framework.getConstants().CANVAS_HEIGHT + entity.getImage().height))
      return true;
    return false;
  }

  _sanityDeleteEntities() {
    for (const entity of this._entities) {
      if (this.outOfCanvas(entity))
        this.requestDestroy(entity, 'Out of bounds');
    }
  }

  requestDestroy(entity, reason) {
    this.destroyAttachedEntities(entity, 'Parent entity destroyed');
    this._eventHandler.registerEvent('destroy', entity, reason);
    this._maskHandler.deleteMask(entity);
    this._entities.splice(this._entities.indexOf(entity), 1);
  }

  executeEntityFrames() {
    for (const entity of this._entities) {
      entity.frame();
    }

    this._manageEntities();
  }

  getFirstCollideEntity(fromEntity) {
    let minX = fromEntity.getImage().width;
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

  resetEntities() {
    this._entities = [];
    this._attachedEntities = [];
  }
}
