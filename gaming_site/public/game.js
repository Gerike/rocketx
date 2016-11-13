/**
 * Created by Geri on 2016. 11. 13..
 */

var canvas = document.getElementById('game_canvas');
ctx = canvas.getContext('2d');

canvas.width  = 800;
canvas.height = 400;

var resources = ['/assets/ship.png', '/assets/favicon.png', '/assets/background.jpg'];
startLoad(ctx);


function startLoad(ctx){
  setUpLoadingScreen(ctx);
  loadResources(resources);
  resource_loader = setInterval(() => {
    drawLoaderBar(ctx,Object.keys(resource_images).length , resources.length);
    if (Object.keys(resource_images).length === resources.length) {
      setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 500);
      clearInterval(resource_loader);
    }
  }, 500);

}
function drawLoaderBar(ctx, progress, all){
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 20, 200 / all * progress, 40);
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function setUpLoadingScreen(ctx){
  ctx.font="40px Georgia";
  ctx.fillStyle = 'white';
  ctx.fillText("Loading in progress",canvas.width/2 - 180, canvas.height/2 - 50);
  ctx.rect(canvas.width/2 - 100, canvas.height/2 - 20, 200, 40);
  ctx.strokeStyle="white";
  ctx.stroke();
}


var entities = [new PlayerShip(0, 0, resource_images['ship.png'], [], [])]

function render(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < entities.length; i++)
    entities[i].draw(ctx);
}

function frame(){
  for(let i = 0; i < entities.length; i++)
    if (entities[i].frame)
      entities[i].frame()
}



