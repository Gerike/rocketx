/**
 * Created by Geri on 2016. 11. 13..
 */
'use strict';

var destroyedShips = 0;

const canvasWidth = 800;
const canvasHeight = 400;

var gameThread;

startLoad(ctx);

var pause = false;

function prepareGameField() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}


function step() {
  if (!pause) {
    framework.frame();
    framework.sanityDeleteEntities(canvasWidth, canvasHeight)
    framework.render(ctx, canvas);
    framework.detectCollision();
  }
  window.requestAnimationFrame(step);

}

function addShips(i, y, path) {

  var addingShips = setInterval(() => {
    if (path === 1) var path = new LinearPath(800, y, 270, 2);
    else {
      if (y - 100 < 0) y = y + 100;
      else if (y + 100 > 400) y = y - 100;
      var path = new WavePath(800, y, 270, 3, 100, 45);
    }
    framework.registerEntity(ShipFactory.createBaseEnemyShip(800, y, path))
  }, 500);
  setTimeout(() => clearInterval(addingShips), 300 * i);
}

function startGame() {
  framework.setUpEventHandlers();
  framework.createStaticMasks(resources);
  framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [patterns.weapons.BASE_CANNON], [patterns.ammos.BASE_AMMO]));
  gameThread = window.requestAnimationFrame(step);
}

function stop() {
  pause = true;
}

function cont() {
  pause = false;
}
