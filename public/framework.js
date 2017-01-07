'use strict';

let framework = {
  frameEvents: [],
  masksData: {'static': {}, 'dynamic': {}},
  entities: [],
  elements: [],
  pressedKeys: {},
  _frameIndex: 0,
  _registeredEntities: 0,
  constants: {}
};

framework.setup = function (canvasHeight, canvasWidth, gameCanvas, secondaryCanvas) {
  framework.constants.canvasHeight = canvasHeight;
  framework.constants.canvasWidth = canvasWidth;
  framework.constants.gameCanvas = gameCanvas;
  framework.constants.secondaryCanvas = secondaryCanvas;

};

framework.maskHandler = {
  getImageData: function (img) {
    let off_canvas = document.createElement('canvas');
    off_canvas.width = img.width;
    off_canvas.height = img.height;
    let off_ctx = off_canvas.getContext('2d');
    off_ctx.drawImage(img, 0, 0);
    return off_ctx.getImageData(0, 0, img.width, img.height);
  },
  createMask: function (entity) {
    let off_canvas = document.createElement('canvas');
    off_canvas.width = entity.img.width;
    off_canvas.height = entity.img.height;

    let off_ctx = off_canvas.getContext('2d');

    if (entity.hasDynamicMask)
      entity.draw(off_ctx, 0, 0);
    else
      off_ctx.drawImage(entity.img, 0, 0);
    return off_ctx.getImageData(0, 0, entity.img.width, entity.img.height);
  },
  createStaticMasks: function (images) {
    for (const key in images)
      framework.masksData['static'][images[key].src] = framework.getImageData(images[key]);
  },
  getMask: function (entity, force_static = false) {
    if ((entity.hasDynamicMask) && (!force_static))
      return framework.masksData['dynamic'][entity._entityID];
    return framework.masksData['static'][entity.img.src];
  },
  refreshDynamicMasks: function () { //TODO: Maybe some event like approach? The entity alert if its mask change
    for (const entity of framework.entities) {
      if (entity.hasDynamicMask)
        framework.refreshDynamicMask(entity)
    }
  },
  refreshDynamicMask: function (entity) {
    framework.masksData['dynamic'][entity._entityID] = framework.createMask(entity)
  },
  createDynamicMask: function (entity) {
    framework.masksData['dynamic'][entity._entityID] = framework.getImageData(entity.img);
  },
};

framework.collisionHandler = {
  handleCollisions: function (array_of_collisions) {
    for (let i = 0; i < array_of_collisions.length; i++)
      framework.notifyEntities(array_of_collisions[i][0], array_of_collisions[i][1]);
  },
  notifyEntities: function (object1, object2) {
    object1.collided(object2);
    object2.collided(object1);
  },
  detectCollision: function () {
    let collidedObjects = [];
    framework.refreshDynamicMasks();
    for (var i = 0; i < framework.entities.length; i++) {
      for (var j = i + 1; j < framework.entities.length; j++) {
        if (framework.entities[i].constructor.name !== framework.entities[j].constructor.name)
          if (framework.isPixelCollision(framework.getMask(framework.entities[i]), framework.entities[i].x, framework.entities[i].y, framework.getMask(framework.entities[j]), framework.entities[j].x, framework.entities[j].y))
            collidedObjects.push([framework.entities[i], framework.entities[j]]);
      }
    }
    framework.handleCollisions(collidedObjects);
  },
  isPixelCollision: function (entity_1_image_data, entity_1_x, entity_1_y, entity_2_image_data, entity_2_x, entity_2_y) {
    entity_1_x = Math.round(entity_1_x);
    entity_1_y = Math.round(entity_1_y);
    entity_2_x = Math.round(entity_2_x);
    entity_2_y = Math.round(entity_2_y);

    let w = entity_1_image_data.width,
      h = entity_1_image_data.height,
      w2 = entity_2_image_data.width,
      h2 = entity_2_image_data.height;

    let xMin = Math.max(entity_1_x, entity_2_x),
      yMin = Math.max(entity_1_y, entity_2_y),
      xMax = Math.min(entity_1_x + w, entity_2_x + w2),
      yMax = Math.min(entity_1_y + h, entity_2_y + h2);

    if (xMin >= xMax || yMin >= yMax) {
      return false;
    }

    let xDiff = xMax - xMin,
      yDiff = yMax - yMin;
    let pixels = entity_1_image_data.data,
      pixels2 = entity_2_image_data.data;
    if (xDiff < 4 && yDiff < 4) {
      for (let pixelX = xMin; pixelX < xMax; pixelX++) {
        for (let pixelY = yMin; pixelY < yMax; pixelY++) {
          if (
            ( pixels [((pixelX - entity_1_x ) + (pixelY - entity_1_y ) * w ) * 4 + 3] !== 0 ) &&
            ( pixels2[((pixelX - entity_2_x) + (pixelY - entity_2_y) * w2) * 4 + 3] !== 0 )
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

      for (var offsetY = 0; offsetY < incY; offsetY++) {
        for (var offsetX = 0; offsetX < incX; offsetX++) {
          for (var pixelY = yMin + offsetY; pixelY < yMax; pixelY += incY) {
            for (var pixelX = xMin + offsetX; pixelX < xMax; pixelX += incX) {
              if (
                ( pixels [((pixelX - entity_1_x ) + (pixelY - entity_1_y ) * w ) * 4 + 3] !== 0 ) &&
                ( pixels2[((pixelX - entity_2_x) + (pixelY - entity_2_y) * w2) * 4 + 3] !== 0 )
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
};

framework.timer = {
  isFramePassed: function (frame) {
    return (frame <= framework._frameIndex);
  },
  getCurrentFrameIndex: function () {
    return framework._frameIndex;
  },
  delegateFrameEvent: function (callback, frame) {
    framework.frameEvents.push({
      _frameIndex: framework._frameIndex + frame,
      execute: callback
    });
  },
  deleteExecutedEvents: function () {
    framework.frameEvents = framework.frameEvents.filter((event) => event._frameIndex > framework._frameIndex)
  },
  executeEvents: function () {
    for (let i = 0; i < framework.frameEvents.length; i++) {
      if (framework.isFramePassed(framework.frameEvents[i]._frameIndex))
        framework.frameEvents[i].execute();
    }
  },
};

framework.entityHandler = {
  addUniqueKey: function (entity) { //TODO: MAYBE USE WRAPPER?
    entity._entityID = framework._registeredEntities;
    framework._registeredEntities++;
  },
  registerEntity: function (entity) {
    framework.addUniqueKey(entity);
    framework.entities.push(entity);
    if (entity.hasDynamicMask)
      framework.createDynamicMask(entity)
  },
  outOfCanvas: function (entity, canvas_width, canvas_height) {
    if ((entity.x < 0) || (entity.x > canvas_width + entity.img.width) || (entity.y < 0) || (entity.y > canvas_height + entity.img.height))
      return true;
    return false;
  },
  sanityDeleteEntities: function (canvas_width, canvas_height) {
    for (let i = 0; i < framework.entities.length; i++) {
      if (framework.outOfCanvas(framework.entities[i], canvas_width, canvas_height)) {
        framework.requestDestroy(framework.entities[i]);
      }
    }
  },
  requestDestroy: function (entity) {
    delete framework.masksData[entity._entityID];
    framework.entities.splice(framework.entities.indexOf(entity), 1);
  },
  executeEntityFrames: function () {
    for (let i = 0; i < framework.entities.length; i++)
      if (framework.entities[i].frame)
        framework.entities[i].frame();
  },
  getNearestEntity: function (fromEntity) {
    //TODO: DO IT
  },
  getFirstCollideEntity: function (fromEntity) {
    let minX = fromEntity.img.width;
    for (var i = 0; i < framework.entities.length; i++) {
      if (framework.entities[i].constructor.name !== fromEntity.constructor.name) {
        if (framework.isPixelCollision(framework.getMask(framework.entities[i]), framework.entities[i].x, framework.entities[i].y, framework.getMask(fromEntity, true), fromEntity.x, fromEntity.y))
          if (minX > framework.entities[i].x - fromEntity.x)
            minX = framework.entities[i].x - fromEntity.x
      }
    }
    if (minX !== fromEntity.img.width)
      return minX + 3;
    return fromEntity.img.width;
  },
};

framework.eventHandler = {
  setUpEventHandlers: function () {
    $(document).off("keydown");
    document.onkeydown = function (e) {
      e.preventDefault();
      framework.pressedKeys[e.which] = true;
    };
    document.onkeyup = function (e) {
      e.preventDefault();
      framework.pressedKeys[e.which] = false;
    };
  },
  isDown: function (key) {
    return framework.pressedKeys[key];
  },
};

framework.other = {
  render: function (ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < framework.entities.length; i++)
      framework.entities[i].draw(ctx);
  },
  frame: function () {
    framework._frameIndex += 1;
    framework.executeEvents();
    framework.deleteExecutedEvents();
    framework.executeEntityFrames();
  },
};

framework.drawer = {
  _elementsChanged: false,
  addElement: function (element) {
    framework.elements.push(element);
    framework.drawer.markElementsAsChanged();
  },

  frame: function () {
    framework.drawer.clearExpired();
  },

  markElementsAsChanged: function () {
    framework.drawer._elementsChanged = true;
  },

  render: function (forced = false) {
    if (framework.drawer._elementsChanged || forced) {
      framework.drawer._elementsChanged = false;
      let sCtx = framework.constants.secondaryCanvas.getContext("2d");
      sCtx.clearRect(0, 0, framework.constants.canvasWidth, framework.constants.canvasHeight);
      for (let i = 0; i < framework.elements.length; i++) {
        framework.elements[i].draw(sCtx);
      }
    }
  },

  clearExpired: function () {
    for (let i = 0; i < framework.elements.length; i++) {
      if (framework.elements[i].isExpired())
        framework.drawer.removeElement(framework.elements[i]);
    }
  },

  removeElement: function (element) {
    framework.elements.splice(framework.elements.indexOf(element), 1);
    framework.drawer.markElementsAsChanged();
  },
};

//Shortcuts
framework.getImageData = framework.maskHandler.getImageData;
framework.createMask = framework.maskHandler.createMask;
framework.createStaticMasks = framework.maskHandler.createStaticMasks;
framework.getMask = framework.maskHandler.getMask;
framework.refreshDynamicMasks = framework.maskHandler.refreshDynamicMasks;
framework.refreshDynamicMask = framework.maskHandler.refreshDynamicMask;
framework.createDynamicMask = framework.maskHandler.createDynamicMask;

framework.handleCollisions = framework.collisionHandler.handleCollisions;
framework.notifyEntities = framework.collisionHandler.notifyEntities;
framework.detectCollision = framework.collisionHandler.detectCollision;
framework.isPixelCollision = framework.collisionHandler.isPixelCollision;

framework.isFramePassed = framework.timer.isFramePassed;
framework.getCurrentFrameIndex = framework.timer.getCurrentFrameIndex;
framework.delegateFrameEvent = framework.timer.delegateFrameEvent;
framework.deleteExecutedEvents = framework.timer.deleteExecutedEvents;
framework.executeEvents = framework.timer.executeEvents;

framework.addUniqueKey = framework.entityHandler.addUniqueKey;
framework.registerEntity = framework.entityHandler.registerEntity;
framework.outOfCanvas = framework.entityHandler.outOfCanvas;
framework.sanityDeleteEntities = framework.entityHandler.sanityDeleteEntities;
framework.requestDestroy = framework.entityHandler.requestDestroy;
framework.executeEntityFrames = framework.entityHandler.executeEntityFrames;
framework.getNearestEntity = framework.entityHandler.getNearestEntity;
framework.getFirstCollideEntity = framework.entityHandler.getFirstCollideEntity;

framework.setUpEventHandlers = framework.eventHandler.setUpEventHandlers;
framework.isDown = framework.eventHandler.isDown;

framework.render = framework.other.render;
framework.frame = framework.other.frame;
