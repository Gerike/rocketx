/**
 * Created by Geri on 2016. 11. 13..
 */
const canvasWidth = 800;
const canvasHeight = 400;

var gameThread;

startLoad(ctx);
framework.setUpEventHandlers();

function prepareGameField() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}


function startGame() {
  entities.push(new PlayerShip(0, 0, resources['ship'], [new BaseCannon(new BaseAmmo(1, resources['base_laser'], 2), 1)], []));
  gameThread = setInterval(() => {
    frame();
    render();
  }, 16)
}

function detectCollision() {
  for (let i = 0; i < entities.length; i++) {
    for (let j = 0; j < entities.length; j++) {
      if (j !== i) {
        if (isPixelCollision(entities[i].img, entities[i].x, entities[i].y, entities[j].img, entities[j].x, entities[j].y))
          console.log(entities[i], entities[j]);
      }
    }
  }
}


function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < entities.length; i++)
    entities[i].draw(ctx);
}

function frame() {
  for (let i = 0; i < entities.length; i++)
    if (entities[i].frame)
      entities[i].frame();
}


