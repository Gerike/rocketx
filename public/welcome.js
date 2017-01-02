/**
 * Created by Win10 on 2017. 01. 01..
 */
'use strict';
const TOP_SCORE_ROW = 6;

function loadHighScores(count, time){
  $.ajax({
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
  );
}

$(document).ready( () => {
  loadHighScores(6, 'Daily')
});
