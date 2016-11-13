/**
 * Created by Geri on 2016. 11. 13..
 */

var framework = {}
var pressedKeys = {};
var resource_images = {}
document.onkeydown = function (e) {
  e.preventDefault();
  pressedKeys[e.which] = true;
};
document.onkeyup = function (e) {
  e.preventDefault();
  pressedKeys[e.which] = false;
};

framework.isDown = function(key){
  return pressedKeys[key];
}

function loadResources(images_src){
  resource_images = {}
  for (let i = 0; i < images_src.length; i++){
    resource_images[images_src[i].split('/').pop()] = document.createElement('img').src = images_src[i];
  }
}
