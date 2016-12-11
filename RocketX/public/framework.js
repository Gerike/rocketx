/**
 * Created by Geri on 2016. 11. 13..
 */
'use strict'

var framework = {
  frameEvents : [],
  masksData : {},
  entities : [],
  pressedKeys : {},
  _frameIndex : 0,
};

framework.setUpEventHandlers = function () {
  document.onkeydown = function (e) {
    e.preventDefault();
    framework.pressedKeys[e.which] = true;
  };
  document.onkeyup = function (e) {
    e.preventDefault();
    framework.pressedKeys[e.which] = false;
  };
};

framework.registerEntity = function (object) {
  framework.entities.push(object);
};
framework.requestDestroy = function (object) {
  framework.entities.splice(framework.entities.indexOf(object), 1);
};

framework.isDown = function (key) {
  return framework.pressedKeys[key];
};

framework.outOfCanvas = function (entity, canvas_width, canvas_height) {
  if ((entity.x < 0) || (entity.x > canvas_width + entity.img.width) || (entity.y < 0) || (entity.y > canvas_height + entity.img.height))
    return true;
  return false;
};

framework.sanityDeleteEntities = function (canvas_width, canvas_height) {
  for (let i = 0; i < framework.entities.length; i++) {
    if (framework.outOfCanvas(framework.entities[i], canvas_width, canvas_height)) {
      framework.requestDestroy(framework.entities[i]);
    }
  }
};

framework.handleCollisions = function (array_of_collisions) {
  for (let i = 0; i < array_of_collisions.length; i++)
    framework.collisionHandler(array_of_collisions[i][0], array_of_collisions[i][1]);
};

framework.collisionHandler = function (object1, object2) {
  object1.collided(object2);
  object2.collided(object1);
};
framework.isPixelCollision = function (first, x, y, other, x2, y2) {
  x = Math.round(x);
  y = Math.round(y);
  x2 = Math.round(x2);
  y2 = Math.round(y2);

  let w = first.width,
    h = first.height,
    w2 = other.width,
    h2 = other.height;

  let xMin = Math.max(x, x2),
    yMin = Math.max(y, y2),
    xMax = Math.min(x + w, x2 + w2),
    yMax = Math.min(y + h, y2 + h2);

  if (xMin >= xMax || yMin >= yMax) {
    return false;
  }

  let xDiff = xMax - xMin,
    yDiff = yMax - yMin;
  let pixels = first.data,
    pixels2 = other.data;
  if (xDiff < 4 && yDiff < 4) {
    for (let pixelX = xMin; pixelX < xMax; pixelX++) {
      for (let pixelY = yMin; pixelY < yMax; pixelY++) {
        if (
          ( pixels [((pixelX - x ) + (pixelY - y ) * w ) * 4 + 3] !== 0 ) &&
          ( pixels2[((pixelX - x2) + (pixelY - y2) * w2) * 4 + 3] !== 0 )
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
              ( pixels [((pixelX - x ) + (pixelY - y ) * w ) * 4 + 3] !== 0 ) &&
              ( pixels2[((pixelX - x2) + (pixelY - y2) * w2) * 4 + 3] !== 0 )
            ) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
};

framework.getImageData = function (img) {
  let off_canvas = document.createElement('canvas');
  off_canvas.width = img.width;
  off_canvas.height = img.height;
  let off_ctx = off_canvas.getContext('2d');
  off_ctx.drawImage(img, 0, 0);
  return off_ctx.getImageData(0, 0, img.width, img.height);
};

framework.createMasks = function (images) {
  framework.masksData = {}
  for (var key in images)
    framework.masksData[images[key].src] = framework.getImageData(images[key])
};

framework.getMask = function (image) {
  return framework.masksData[image.src]
}

framework.detectCollision = function () {
  let collidedObjects = []
  for (var i = 0; i < framework.entities.length; i++) {
    for (var j = i + 1; j < framework.entities.length; j++) {
      if (framework.entities[i].constructor.name !== framework.entities[j].constructor.name)
        if (framework.isPixelCollision(framework.getMask(framework.entities[i].img), framework.entities[i].x, framework.entities[i].y, framework.getMask(framework.entities[j].img), framework.entities[j].x, framework.entities[j].y))
          collidedObjects.push([framework.entities[i], framework.entities[j]]);
    }
  }
  framework.handleCollisions(collidedObjects);
};

framework.render = function (ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < framework.entities.length; i++)
    framework.entities[i].draw(ctx);
};

framework.executeEvents = function(){
  for(let i = 0; i < framework.frameEvents.length; i++){
    if (framework.isFramePassed(framework.frameEvents[i]._frameIndex))
      framework.frameEvents[i].execute();
  }
};

framework.executeEntityFrames = function(){
  for (let i = 0; i < framework.entities.length; i++)
    if (framework.entities[i].frame)
      framework.entities[i].frame();
};

framework.frame = function(){
  framework._frameIndex += 1;
  framework.executeEvents();
  framework.deleteExecutedEvents();
  framework.executeEntityFrames();
};

framework.isFramePassed = function(frame){
  return (frame <= framework._frameIndex);
};

framework.getCurrentFrameIndex = function() {
  return framework._frameIndex;
};

framework.delegateFrameEvent = function (callback, frame){
  framework.frameEvents.push({
    _frameIndex : framework._frameIndex + frame,
    execute: callback
  });
};

framework.deleteExecutedEvents = function(){
  framework.frameEvents = framework.frameEvents.filter((event) => event._frameIndex > framework._frameIndex)
};
