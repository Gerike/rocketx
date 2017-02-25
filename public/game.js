'use strict';

const canvasWidth = 800;
const canvasHeight = 400;


var gameThread;
var framework;
var pause = false;


function prepareGame(){
  prepareGameField();
  framework = new Framework(canvasHeight, canvasWidth, document.getElementById('game_canvas'));
  framework.loadLevelPack(new TutorialPack());
}

function prepareGameField() {
  const canvas = document.getElementById('game_canvas');
  const special_message_canvas = document.getElementById('special_messages');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  special_message_canvas.width = canvasWidth;
  special_message_canvas.height = canvasHeight;
}

function step() {
  if (!pause)
    framework.step();
  window.requestAnimationFrame(step);
}

function stop() {
  pause = true;
}

function cont() {
  pause = false;
}

prepareGame();
