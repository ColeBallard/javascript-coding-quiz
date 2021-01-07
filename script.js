var secondsElapsed, interval;
const TOTAL_SECONDS = 180, TIME_PENALTY = 15;

function startQuiz() {
  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'block');

  startTimer();
}

function startCountdown() {
  var timer = 3;
  $('#quiz-countdown').text(timer--);

  var countdown = setInterval(function() {
    $('#quiz-countdown').text(timer--);
    if (timer == -2) {
      clearInterval(countdown); 
      startQuiz();
  }
  }, 1000);
}

function startTimer() {
  secondsElapsed = 0;

  interval = setInterval(function() {
    secondsElapsed++;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}


function renderTimer() {
  var seconds = TOTAL_SECONDS - secondsElapsed;
  var minutes = Math.floor(seconds / 60);

  seconds %= 60;
  if (seconds <= 9) seconds = "0" + seconds;

  $('#time-left-text').text(minutes + ":" + seconds);

  if (secondsElapsed >= TOTAL_SECONDS) stopTimer();
}

function decreaseTimer() {
  secondsElapsed -= TIME_PENALTY;
}


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
  startCountdown();
});