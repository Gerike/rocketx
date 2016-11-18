/**
 * Created by Geri on 2016. 11. 13..
 */
const canvasWidth = 800;
const canvasHeight = 400;

var gameThread;
var sanityDeleteThread;

startLoad(ctx);
framework.setUpEventHandlers();

function prepareGameField() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}


function step() {
  framework.frame();
  framework.sanityDeleteEntities(canvasWidth, canvasHeight)
  framework.render(ctx, canvas);
  framework.detectCollision();
  window.requestAnimationFrame(step);
}


function startGame() {
  framework.createMasks(resources);
  framework.registerEntity(ShipFactory.createBasePlayerShip(0, 0));
  gameThread = window.requestAnimationFrame(step);
}




