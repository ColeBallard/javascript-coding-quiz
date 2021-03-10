function startCountdown() {
  countdown = 3;
  $('#quiz-countdown').text(countdown);


  countdownInterval = setInterval(function() {
    countdown--;
    renderCountdown();
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
  startQuiz();
}

function renderCountdown() {
  $('#quiz-countdown').text(countdown);

  if (countdown <= 0) stopCountdown();
}