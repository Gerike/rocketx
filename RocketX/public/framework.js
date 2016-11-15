/**
 * Created by Geri on 2016. 11. 13..
 */

var framework = {};
var pressedKeys = {};

framework.setUpEventHandlers = function () {
  document.onkeydown = function (e) {
    e.preventDefault();
    pressedKeys[e.which] = true;
  };
  document.onkeyup = function (e) {
    e.preventDefault();
    pressedKeys[e.which] = false;
  };
};

framework.requestDestroy = function (object){
  console.log('Removed entity: ', entities.splice(entities.indexOf(object), 1) )
}

framework.isDown = function (key) {
  return pressedKeys[key];
};

framework.outOfCanvas = function (entity, canvas_width, canvas_height) {
  if ((entity.x < -50) || (entity.x > canvas_width + 100) || (entity.y < -50) || (entity.y > canvas_height + 100))
    return true;
  return false;
};

framework.sanityDeleteEntities = function (entities, canvas_width, canvas_height) {
  for (let i = 0; i < entities.length; i++) {
    if (framework.outOfCanvas(entities[i], canvas_width, canvas_height)) {
      framework.requestDestroy(entities[i]);
    }
  }
};

framework.handleCollisions = function (array_of_collisions) {
  for (let i = 0; i <array_of_collisions.length; i++)
    framework.collisionHandler(array_of_collisions[i][0], array_of_collisions[i][1]);
}

framework.collisionHandler = function (object1, object2) {
  object1.collided(object2);
  object2.collided(object1);
}
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

    for (let offsetY = 0; offsetY < incY; offsetY++) {
      for (let offsetX = 0; offsetX < incX; offsetX++) {
        for (let pixelY = yMin + offsetY; pixelY < yMax; pixelY += incY) {
          for (let pixelX = xMin + offsetX; pixelX < xMax; pixelX += incX) {
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
