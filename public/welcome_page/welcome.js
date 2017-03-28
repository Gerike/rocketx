'use strict';

function loadHighScores(count, time) {
  //TODO: LOAD HIGH SCORES
}

function loadLatestNews() {
  $.ajax({
    url: 'https://api.github.com/repos/gerike/rocketx/commits',
    method: 'GET'
  }).done((data) => {
    for (let i = 0; i < 5; i++) {
      let date = new Date(data[i].commit.committer.date);
      document.getElementById('ln_date' + i).innerHTML = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDay();
      document.getElementById('ln_message' + i).innerHTML = data[i].commit.message;
    }
  });
}

$(document).ready(() => {
  loadLatestNews();
  loadHighScores(6, 'Daily');
});
