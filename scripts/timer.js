function startTimer() {
  secondsElapsed = 0;

  interval = setInterval(function() {
    secondsElapsed++;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  displayScore();
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
  secondsElapsed += TIME_PENALTY;
  if (secondsElapsed >= TOTAL_SECONDS)
    secondsElapsed = TOTAL_SECONDS - 1;
}

function resetTimer() {
  secondsElapsed = 0;
  $('#time-left-text').text('3:00');
}