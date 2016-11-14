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

framework.isDown = function (key) {
  return pressedKeys[key];
};


framework.isPixelCollision = function (first, x, y, other, x2, y2) {
  x = Math.round(x);
  y = Math.round(y);
  x2 = Math.round(x2);
  y2 = Math.round(y2);

  var w = first.width,
    h = first.height,
    w2 = other.width,
    h2 = other.height;

  var xMin = Math.max(x, x2),
    yMin = Math.max(y, y2),
    xMax = Math.min(x + w, x2 + w2),
    yMax = Math.min(y + h, y2 + h2);

  if (xMin >= xMax || yMin >= yMax) {
    return false;
  }

  var xDiff = xMax - xMin,
    yDiff = yMax - yMin;

  var pixels = first.data,
    pixels2 = other.data;

  if (xDiff < 4 && yDiff < 4) {
    for (var pixelX = xMin; pixelX < xMax; pixelX++) {
      for (var pixelY = yMin; pixelY < yMax; pixelY++) {
        if (
          ( pixels [((pixelX - x ) + (pixelY - y ) * w ) * 4 + 3] !== 0 ) &&
          ( pixels2[((pixelX - x2) + (pixelY - y2) * w2) * 4 + 3] !== 0 )
        ) {
          return true;
        }
      }
    }
  } else {
    var incX = xDiff / 3.0,
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
