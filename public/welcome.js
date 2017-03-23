/**
 * Created by Win10 on 2017. 01. 01..
 */
'use strict';
const TOP_SCORE_ROW = 6;

function loadHighScores(count, time){
 /* $.ajax({
      url: '/rest/scores/' + count,
      method: 'GET'
  }).done( (data) => {
        data = JSON.parse(data);
        for(let i = 0; i < data.length; i++){
          document.getElementById('toplist' + i).innerHTML = data[i].username;
          document.getElementById('toplist_score' + i).innerHTML = data[i].points;
        }
        if (data.length < TOP_SCORE_ROW - 1){
          for(let i = data.length; i < TOP_SCORE_ROW; i++){
            document.getElementById('toplist' + i).innerHTML = "";
            document.getElementById('toplist_score' + i).innerHTML = "";
          }
        }
    }
  );*/
}

function loadLatestNews(){
  $.ajax({
    url: 'https://api.github.com/repos/gerike/rocketx/commits',
    method: 'GET'
  }).done( (data) => {
    for(let i = 0; i < 5; i++){
      let date = new Date(data[i].commit.committer.date)
      document.getElementById('ln_date' + i).innerHTML = date.getFullYear() + '.' + (date.getMonth() +1) + '.' + date.getDay();
      document.getElementById('ln_message' + i).innerHTML = data[i].commit.message;
    }
  });
}

$(document).ready( () => {
  loadLatestNews();
  loadHighScores(6, 'Daily');
});
