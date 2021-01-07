$('#quiz-page header .btn').click(function() {
  console.log('test');
  $('#quiz-page').css('display', 'none');
  $('#highscores-page').css('display', 'block');
});

$('#highscores-page header .btn').click(function() {
  $('#highscores-page').css('display', 'none');
  $('#quiz-page').css('display', 'block');
});