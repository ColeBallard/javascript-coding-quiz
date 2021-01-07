const TOTAL_SECONDS = 180, TIME_PENALTY = 15;
var secondsElapsed, interval, countdown, countdownInterval;

var questions = [
  {
    question: "What attribute is used in the '<script>' tag to link to a Javascript file?",
    answers: ["src", "href", "a", "aria"]
  },
  {
    question: "Who created Javascript while working for Netscape in 1995?",
    answers: ["Brandon Eich", "Bjarne Stroustrup", "James Gosling", "Tim Berners-Lee"]
  },
  {
    question: "What pair of symbols follows the end of a function?",
    answers: ["()", "[]", "{}", "<>"]
  },
  {
    question: "What's the main difference in how '===' and '==' compare values?",
    answers: ["type", "int", "assignment", "iteration"]
  },
  {
    question: "What data type is to be expected in the parenthesis after a 'while' loop?",
    answers: ["boolean", "integer", "string", "object"]
  },
  {
    question: "Which of these is a correct implementation of a 'for' loop?",
    answers: ["for (var i = 0; i <= 10; i++) { ... }", "for (i > 10) { ... }", "for (var i = 0; i == true ; i++) { ... }", "for (i + i * 10) { ... }"]
  },
  {
    question: "Which of these is a correct implementation of a single-line comment in Javascript?",
    answers: ["// comment", "/ comment /", "/- comment -/", "/-/ comment /-/"]
  },
  {
    question: "What pair of symbols is used to denote an array?",
    answers: ["[]", "()", "{}", "<>"]
  },
  {
    question: "What will 'Math.random()' return?",
    answers: ["a floating value between 0 and 1", "undefined", "an integer between 1 and 10", "an integer between 0 and 9"]
  },
  {
    question: "What company currently owns the rights to Javascript?",
    answers: ["Oracle", "Google", "International Organization for Standardization", "Microsoft"]
  },
  {
    question: "Which of these is not a variable keyword in Javascript?",
    answers: ["int", "var", "let", "const"]
  },
  {
    question: "What operator is used to perform multiplication?",
    answers: ["*", "x", "#", "multiply()"]
  },
  {
    question: "Which one of these statements is correct?",
    answers: ["Javascript is case-sensitive and ignores whitespace", "Javascript is not case-sensitive and ignores whitespace", "Javascript is case-sensitive and doesn't ignore whitespace", "Javascript is not case-sensitive and doesn't ignore whitespace"]
  },
  {
    question: "Which of these statements is correct?",
    answers: ["Javascript is a weakly and dynamically typed language", "Javascript is a strongly and dynamically typed language", "Javascript is a weakly and non-dynamically typed language", "Javascript is a strongly and non-dynamically typed language"]
  },
  {
    question: "Which function returns the character at a specified index?",
    answers: ["charAt()", "indexOf()", "getChar()", "getIndex()"]
  },
  {
    question: "Is Javascript multi-threaded?",
    answers: ["no", "yes", "maybe", "so"]
  },
  {
    question: "Is 'null' an object?",
    answers: ["yes", "no", "maybe", "so"]
  },
  {
    question: "Which of these is a Javascript file extension?",
    answers: [".js", ".jvs", ".javascript", ".ajt"]
  },
  {
    question: "What Javascript function is used to get an HTML DOM element with a specified ID?",
    answers: ["getElementByID()", "getElement()", "id()", "retrieveElement()"]
  },
  {
    question: "if/else and switch/case are both conditional statements. What is the if/else equivalent of 'default:'?",
    answers: ["else", "break", "continue", "boolean"]
  }
];

function startQuiz() {
  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'block');

  startTimer();
  nextQuestion();
}

function startTimer() {
  secondsElapsed = 0;

  interval = setInterval(function() {
    secondsElapsed++;
    renderTimer();
  }, 1000);
}

function startCountdown() {
  countdown = 3;

  countdownInterval = setInterval(function() {
    countdown--;
    renderCountdown();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  // call score function
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
    
  }, 1000);
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
  console.log(newArray);
  for (var z = 0; z <= (length - 2); z++) {
    questions.push(newArray[z]);
  }
  console.log(questions);
}

function stopCountdown() {
  clearInterval(countdownInterval);
  startQuiz();
}


function renderCountdown() {
  $('#quiz-countdown').text(countdown);

  if (countdown <= 0) stopCountdown();
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


$('#quiz-page-body-quiz .btn').click(function() {
  checkAnswer(this);
}) ;