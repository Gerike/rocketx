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


function startGame() {
  entities.push(new PlayerShip(0, 0, resources['ship'], [new BaseCannon(new BaseAmmo(1, resources['base_laser'], 2), 0.2)], []));
  gameThread = setInterval(() => {
    frame();
    render();
    detectCollision()
  }, 16);
  sanityDeleteThread = setInterval(() => framework.sanityDeleteEntities(entities, canvasWidth, canvasHeight), 5000);
}

function getImageData(img) {
  let off_canvas = document.createElement('canvas');
  off_canvas.width = img.width;
  off_canvas.height = img.height;
  let off_ctx = off_canvas.getContext('2d');
  off_ctx.drawImage(img, 0, 0);
  return off_ctx.getImageData(0, 0, img.width, img.height);
}

function createMasks(entities) {
  let masksData = Array(entities.length); //Pushing into arrays is bad?
  for (let i = 0; i < entities.length; i++) {
    masksData[i] = getImageData(entities[i].img)
  }
  return masksData;
}

function detectCollision() {
  let masksData = createMasks(entities);
  for (let i = 0; i < entities.length; i++) {
    for (let j = i+1; j < entities.length; j++) {
      if(framework.isPixelCollision(masksData[i], entities[i].x, entities[i].y, masksData[j], entities[j].x, entities[j].y))
        console.log('HIT');
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


