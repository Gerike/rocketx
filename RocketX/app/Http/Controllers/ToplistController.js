/**
 * Created by Win10 on 2016. 12. 30..
 */
'use strict';
const Database = use('Database');
class ToplistController {
  * getTopScores(request, response){
    const count = (request.param('count') <= 100) ? request.param('count') : 100;
    /*switch(query['time']){
      case 'ever':
        const scores = yield Database.from('toplist').select('*').limit(count);
        break;
    }*/
    const scores = yield Database.from('toplist').select('*').limit(count);
    yield scores;
  }
}

module.exports = ToplistController;
