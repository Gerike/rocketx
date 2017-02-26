'use strict';

const canvasWidth = 800;
const canvasHeight = 400;

let framework;
let pause = false;

function prepareGame() {
  _prepareGameField();
  framework = new Framework(canvasHeight, canvasWidth, document.getElementById('game_canvas'));
  framework.loadLevelPack(new TutorialPack());
}

function _prepareGameField() {
  const canvas = document.getElementById('game_canvas');
  const specialMessageCanvas = document.getElementById('special_messages');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  specialMessageCanvas.width = canvasWidth;
  specialMessageCanvas.height = canvasHeight;
}

function step() {
  if (!pause)
    framework._step();
  window.requestAnimationFrame(step);
}

function stop() {
  pause = true;
}

function cont() {
  pause = false;
}

prepareGame();
