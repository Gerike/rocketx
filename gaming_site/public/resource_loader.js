/**
 * Created by Geri on 2016. 11. 14..
 */
'use strict'

var entities = [];
var resources = ['/assets/ship.png', '/assets/base_laser.png'];
var canvas = document.getElementById('game_canvas');
var ctx = canvas.getContext('2d');
var resource_images = {};

function setUpLoadingScreen(ctx){
  ctx.font="40px Georgia";
  ctx.fillStyle = 'white';
  ctx.fillText("Loading in progress",canvas.width/2 - 180, canvas.height/2 - 50);
  ctx.rect(canvas.width/2 - 100, canvas.height/2 - 20, 200, 40);
  ctx.strokeStyle="white";
  ctx.stroke();
}

function updateLoaderBar(ctx, progress, all){
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 20, 200 / all * progress, 40);
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function loadResources(ctx, counter){
  if (counter < resources.length) {
    let temp_img = document.createElement('img');
    temp_img.onload = function () {
      resource_images[resources[counter].split('/').pop().split('.')[0]] = temp_img;
      updateLoaderBar(ctx, counter + 1, resources.length)
      loadResources(ctx, counter += 1);
    };
    temp_img.src = resources[counter];
  }
  else
    prepareGame();
}

function prepareGame(){
  entities.push(new PlayerShip(0, 0, resource_images['ship'], [new BaseCannon(new BaseAmmo(1,resource_images['base_laser'],2), 1)], []));
  //Game ready to play => startGame();
}

function startLoad(ctx){
  setUpLoadingScreen(ctx);
  loadResources(ctx, 0);
}



