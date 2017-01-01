/**
 * Created by Win10 on 2016. 12. 30..
 */
'use strict';
const Database = use('Database');
const User = use('App/Model/User');
class ToplistController {
  * getTopScores(request, response){
    const count = (request.param('count') <= 100) ? request.param('count') : 100;
    /*switch(query['time']){
      case 'ever':
        const scores = yield Database.from('toplist').select('*').limit(count);
        break;
    }*/
    const scores = yield Database.from('toplist').select('*').orderBy('points', 'desc').limit(count);
    let resp = [];
    for(let score of scores){
      resp.push({
        'username': (yield User.find(score.user_id)).attributes['username'],
        'points': score.points
      });
    }
    return response.send(JSON.stringify(resp))
  }
}

module.exports = ToplistController;
