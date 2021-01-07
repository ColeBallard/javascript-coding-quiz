$('#quiz-page header .btn').click(function() {
  $('#quiz-page').css('display', 'none');
  $('#highscores-page').css('display', 'block');
});

$('#highscores-page header .btn').click(function() {
  $('#highscores-page').css('display', 'none');
  $('#quiz-page').css('display', 'block');
});

$('#quiz-page-body-start .btn').click(function() {
  $('#quiz-page-body-start').css('display', 'none');
  $('#quiz-page-body-countdown').css('display', 'block');

  var count = 3;
  $('#quiz-countdown').text(count--);

  setInterval(function() {
    $('#quiz-countdown').text(count--);
    if (count == 0) 
      startQuiz();
  }, 1000);

});

function startQuiz() {
  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'block');
}