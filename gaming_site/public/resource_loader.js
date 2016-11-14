/**
 * Created by Geri on 2016. 11. 14..
 */
'use strict'

const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');
const resources_location = ['/assets/ship.png', '/assets/base_laser.png'];

var entities = [];
var resources = {};

function setUpLoadingScreen(ctx) {
  ctx.font = "40px Georgia";
  ctx.fillStyle = 'white';
  ctx.fillText("Loading in progress", canvas.width / 2 - 180, canvas.height / 2 - 50);
  ctx.rect(canvas.width / 2 - 100, canvas.height / 2 - 20, 200, 40);
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function updateLoaderBar(ctx, progress, all) {
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 20, 200 / all * progress, 40);
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function getFileName(path) {
  return path.split('/').pop().split('.')[0]
}

function loadResources(ctx, counter) {
  if (counter < resources_location.length) {
    let temp_img = document.createElement('img');
    temp_img.onload = function () {
      resources[getFileName(resources_location[counter])] = temp_img;
      updateLoaderBar(ctx, counter + 1, resources_location.length)
      loadResources(ctx, counter += 1);
    };
    temp_img.src = resources_location[counter];
  }
  else
    prepareGame();
}

function prepareGame() {
  entities.push(new PlayerShip(0, 0, resources['ship'], [new BaseCannon(new BaseAmmo(1, resources['base_laser'], 2), 1)], []));
  //Game ready to play => startGame();
}

function startLoad(ctx) {
  setUpLoadingScreen(ctx);
  loadResources(ctx, 0);
}



