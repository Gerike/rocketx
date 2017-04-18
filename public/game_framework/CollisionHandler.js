'use strict';

class CollisionHandler {
  constructor() {
    this._maskHandler = MaskHandler.getInstance();
  }

  _notifyEntities(collisions) {
    for (const collision of collisions) {
      collision[0].collided(collision[1]);
      collision[1].collided(collision[0]);
    }
  }

  handleCollisions(entities) {
    this._notifyEntities(this.getCollidedEntities(entities));
  }

  getCollidedEntities(entities) {
    let collidedObjects = [];
    this._maskHandler.refreshDynamicMasks(entities);

    for (let i = 0; i < entities.length; i++) {
      let entity1 = entities[i];
      for (let j = i + 1; j < entities.length; j++) {
        let entity2 = entities[j];
        if (this.shouldCheckCollision(entity1, entity2))
          if (this.isPixelCollision(this._maskHandler.getMask(entity1), entity1.getPosition(), this._maskHandler.getMask(entity2), entity2.getPosition()))
            collidedObjects.push([entity1, entity2]);
      }
    }
    return collidedObjects;
  }

  shouldCheckCollision(entity1, entity2) {
    return entity1.isCollidable() && entity2.isCollidable() && entity1.constructor.name !== entity2.constructor.name; //Object from the same type can't collide (projectiles wont kill each other) TODO: Should depend upen if the object is care about the other one
  }

  isPixelCollision(entity1ImageData, entity1Position, entity2ImageData, entity2Position) {
    let entity1XPos = Math.round(entity1Position.getX());
    let entity1YPos = Math.round(entity1Position.getY());
    let entity2XPos = Math.round(entity2Position.getX());
    let entity2YPos = Math.round(entity2Position.getY());

    let w = entity1ImageData.width,
      h = entity1ImageData.height,
      w2 = entity2ImageData.width,
      h2 = entity2ImageData.height;

    let xMin = Math.max(entity1XPos, entity2XPos),
      yMin = Math.max(entity1YPos, entity2YPos),
      xMax = Math.min(entity1XPos + w, entity2XPos + w2),
      yMax = Math.min(entity1YPos + h, entity2YPos + h2);

    if (xMin >= xMax || yMin >= yMax) {
      return false;
    }

    let xDiff = xMax - xMin,
      yDiff = yMax - yMin;
    let pixels = entity1ImageData.data,
      pixels2 = entity2ImageData.data;
    if (xDiff < 4 && yDiff < 4) {
      for (let pixelX = xMin; pixelX < xMax; pixelX++) {
        for (let pixelY = yMin; pixelY < yMax; pixelY++) {
          if (
            ( pixels [((pixelX - entity1XPos ) + (pixelY - entity1YPos ) * w ) * 4 + 3] !== 0 ) &&
            ( pixels2[((pixelX - entity2XPos) + (pixelY - entity2YPos) * w2) * 4 + 3] !== 0 )
          ) {
            return true;
          }
        }
      }
    } else {
      let incX = xDiff / 3.0,
        incY = yDiff / 3.0;
      incX = (~~incX === incX) ? incX : (incX + 1 | 0);
      incY = (~~incY === incY) ? incY : (incY + 1 | 0);

      for (let offsetY = 0; offsetY < incY; offsetY++) {
        for (let offsetX = 0; offsetX < incX; offsetX++) {
          for (let pixelY = yMin + offsetY; pixelY < yMax; pixelY += incY) {
            for (let pixelX = xMin + offsetX; pixelX < xMax; pixelX += incX) {
              if (
                ( pixels [((pixelX - entity1XPos ) + (pixelY - entity1YPos ) * w ) * 4 + 3] !== 0 ) &&
                ( pixels2[((pixelX - entity2XPos) + (pixelY - entity2YPos) * w2) * 4 + 3] !== 0 )
              ) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }
}
