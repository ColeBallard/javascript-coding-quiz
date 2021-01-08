const TOTAL_SECONDS = 180, TIME_PENALTY = 15;
var secondsElapsed, interval, countdown, countdownInterval;
var questions = [];

function startQuiz() {
  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'block');

  startTimer();
  makeQuestionsDefault();
  nextQuestion();
}

function checkAnswer(element) {
  var correct = false;

  for (var x in questions) {
    if (element.textContent === questions[x].answers[0])
      correct = true;
  }
  
  displayAnswerFeedback(correct);
}

function nextQuestion() {
  var randomQuestionIndex = Math.floor(Math.random() * questions.length);

  $('#quiz-question').text(questions[randomQuestionIndex].question);

  var arrayCopy = [...questions[randomQuestionIndex].answers];
  arrayCopy = shuffleArray(arrayCopy);

  var i = 0;
  $('#quiz-page-body-quiz .btn').each(function() {
    this.textContent = arrayCopy[i++];
  });
}

function displayAnswerFeedback(correct) {
  if (correct) {
    $('#answer-feedback').css({
      'visibility' : 'visible',
      'color' : 'Green'
    });
    $('#answer-feedback').text('Correct!');
  }
  else {
    $('#answer-feedback').css({
      'visibility' : 'visible',
      'color' : 'Red'
    });
    $('#answer-feedback').text('Incorrect.');

    decreaseTimer();
  }
  setTimeout(function() {
    $('#answer-feedback').css('visibility', 'hidden');
    for (var x in questions) {
      if ($('#quiz-question').text().localeCompare(questions[x].question) == 0) 
        deleteIndexFromQuestions(x);
    }
    
    if (questions.length != 0)
      nextQuestion();
    else stopTimer();
  }, 1000);
}

function displayScore() {
  var score = TOTAL_SECONDS - secondsElapsed;

  $('#quiz-page-body-quiz').css('display', 'none');
  $('#score-enter-initials').css('display', 'block');

  $('#score-text').text(score);
}

function deleteIndexFromQuestions(index) {
  var newArray = [];
  var length = questions.length;

  for (var x = 0; x <= (length - 1); x++) {
    if (x != index)
      newArray.push(questions[x]);
    else;
  }

  for (var y = 0; y <= (length - 1); y++) {
    questions.pop();
  }
  
  for (var z = 0; z <= (length - 2); z++) {
    questions.push(newArray[z]);
  }
}

function makeQuestionsDefault() {
  var length = questions.length;

  for (var i = 0; i <= (length - 1); i++)
    questions.pop();

  for (var j = 0; j <= (QUESTIONS_DEF.length - 1); j++) 
    questions.push(QUESTIONS_DEF[j]);
}

function shuffleArray(array) {
  var tempIndex, tempValue;

  for (var i = array.length - 1; i > 0; i--) {
    tempIndex = Math.floor(Math.random() * (i + 1));
    tempValue = array[i];
    array[i] = array[tempIndex];
    array[tempIndex] = tempValue;
  }

  return array;
}

$('#quiz-page header .btn').click(function() {
  $('#quiz-page').css('display', 'none');
  $('#highscores-page').css('display', 'block');
  renderHighscores();
});

$('#highscores-page header .btn').click(function() {
  clearInterval(interval);
  clearInterval(countdownInterval);

  $('#highscores-page').css('display', 'none');

  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'none');
  $('#score-enter-initials').css('display', 'none');

  $('#quiz-page-body-start').css('display', 'block');
  $('#quiz-page').css('display', 'block');
  resetTimer();
});

$('#quiz-page-body-start .btn').click(function() {
  $('#quiz-page-body-start').css('display', 'none');
  $('#quiz-page-body-countdown').css('display', 'block');
  startCountdown();
});

$('#quiz-page-body-quiz .btn').click(function() {
  checkAnswer(this);
});

$('#score-enter-initials .btn').click(function() {
  addScore();
});