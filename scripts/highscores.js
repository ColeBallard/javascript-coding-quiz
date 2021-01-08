function addScore() {
  var userScore = TOTAL_SECONDS - secondsElapsed;
  var initials = $('#initials-input').val();
  var scores;

  if (!localStorage.getItem('scores')) {
    scores = {[initials] : userScore};
    localStorage.setItem('scores', JSON.stringify(scores));
  }
  else {
    scores = JSON.parse(localStorage.getItem('scores'));
    scores[initials] = userScore;
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  $('#quiz-page').css('display', 'none');

  $('#highscores-page').css('display', 'block');
  renderHighscores();
}
 
function renderHighscores() {
  if (localStorage.getItem('scores'))
    var scores = JSON.parse(localStorage.getItem('scores'));
  else return;

  var arr = sortObject(scores);

  var i = 0;
  $('#highscore-list li').each(function() {
    $(this).css('display', 'block');
    if (i <= (arr.length - 1))
      $(this).text(arr[i]['key'] + " - " + arr[i++]['value']);
    else
      $(this).css('display', 'none');
  });  
}

function sortObject(object) {
  var arr = [];

  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      arr.push({'key': property, 'value': object[property]
      });
    }
  }

  return arr.sort(function(a, b) { return b.value - a.value; });
}