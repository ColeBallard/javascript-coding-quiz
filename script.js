const TOTAL_SECONDS = 180, TIME_PENALTY = 15;
var secondsElapsed, interval, countdown, countdownInterval;

const QUESTIONS = [
  {
    question: "What attribute is used in the '<script>' tag to link to a Javascript file?",
    answers: {
      a: "src",
      b: "href",
      c: "a",
      d: "aria"
    }
  },
  {
    question: "Who created Javascript while working for Netscape in 1995?",
    answers: {
      a: "Brandon Eich",
      b: "Bjarne Stroustrup",
      c: "James Gosling",
      d: "Tim Berners-Lee"
    }
  },
  {
    question: "What pair of symbols follows the end of a function?",
    answers: {
      a: "()",
      b: "[]",
      c: "{}",
      d: "<>"
    }
  },
  {
    question: "What's the main difference in how '===' and '==' compare values?",
    answers: {
      a: "type",
      b: "int",
      c: "assignment",
      d: "iteration"
    }
  },
  {
    question: "What data type is to be expected in the parenthesis after a 'while' loop?",
    answers: {
      a: "boolean",
      b: "integer",
      c: "string",
      d: "object"
    }
  },
  {
    question: "Which of these is a correct implementation of a 'for' loop?",
    answers: {
      a: "for (var i = 0; i <= 10; i++) { ... }",
      b: "for (i > 10) { ... }",
      c: "for (var i = 0; i == true ; i++) { ... }",
      d: "for (i + i * 10) { ... }"
    }
  },
  {
    question: "Which of these is a correct implementation of a single-line comment in Javascript?",
    answers: {
      a: "// comment",
      b: "/ comment /",
      c: "/- comment -/",
      d: "/-/ comment /-/"
    }
  },
  {
    question: "What pair of symbols is used to denote an array?",
    answers: {
      a: "[]",
      b: "()",
      c: "{}",
      d: "<>"
    }
  },
  {
    question: "What will 'Math.random()' return?",
    answers: {
      a: "a floating value between 0 and 1",
      b: "undefined",
      c: "an integer between 1 and 10",
      d: "an integer between 0 and 9"
    }
  },
  {
    question: "What company currently owns the rights to Javascript?",
    answers: {
      a: "Oracle",
      b: "Google",
      c: "International Organization for Standardization",
      d: "Microsoft"
    }
  },
  {
    question: "Which of these is not a variable keyword in Javascript?",
    answers: {
      a: "int",
      b: "var",
      c: "let",
      d: "const"
    }
  },
  {
    question: "What operator is used to perform multiplication?",
    answers: {
      a: "*",
      b: "x",
      c: "#",
      d: "multiply()"
    }
  },
  {
    question: "Which of these statements is correct?",
    answers: {
      a: "Javascript is case-sensitive and ignores whitespace",
      b: "Javascript is not case-sensitive and ignores whitespace",
      c: "Javascript is case-sensitive and doesn't ignore whitespace",
      d: "Javascript is not case-sensitive and doesn't ignore whitespace"
    }
  },
  {
    question: "Which of these statements is correct?",
    answers: {
      a: "Javascript is a weakly and dynamically typed language",
      b: "Javascript is a strongly and dynamically typed language",
      c: "Javascript is a weakly and non-dynamically typed language",
      d: "Javascript is a strongly and non-dynamically typed language"
    }
  },
  {
    question: "Which function returns the character at a specified index?",
    answers: {
      a: "charAt()",
      b: "indexOf()",
      c: "getChar()",
      d: "getIndex()"
    }
  },
  {
    question: "Is Javascript multi-threaded?",
    answers: {
      a: "no",
      b: "yes",
      c: "maybe",
      d: "so"
    }
  },
  {
    question: "Is 'null' an object?",
    answers: {
      a: "yes",
      b: "no",
      c: "maybe",
      d: "so"
    }
  },
  {
    question: "Which of these is a Javascript file extension?",
    answers: {
      a: ".js",
      b: ".jvs",
      c: ".javascript",
      d: ".ajt"
    }
  },
  {
    question: "What function is used to get an HTML DOM element with a specified ID?",
    answers: {
      a: "getElementByID()",
      b: "getElement()",
      c: "id()",
      d: "retrieveElement()"
    }
  },
  {
    question: "if/else and switch/case are both conditional statements. What is the if/else equivalent of 'default:'?",
    answers: {
      a: "else",
      b: "break",
      c: "continue",
      d: "boolean"
    }
  }
];

function startQuiz() {
  $('#quiz-page-body-countdown').css('display', 'none');
  $('#quiz-page-body-quiz').css('display', 'block');

  startTimer();
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
  secondsElapsed -= TIME_PENALTY;
}

function stopCountdown() {
  clearInterval(countdownInterval);
  startQuiz();
}


function renderCountdown() {
  $('#quiz-countdown').text(countdown);

  if (countdown <= 0) stopCountdown();
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