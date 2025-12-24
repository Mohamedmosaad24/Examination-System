
var questionsList = [
      {
        id: 1,
        question: "ََ(1) Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "ََ(2) What does the typeof operator return for (null) in JavaScript?",
        options: ["null", "undefined", "object", "number"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "(3) What is the correct way to write a comment in JavaScript?",
        options: ["# comment", "// comment", "<!-- comment -->", "-- comment --"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "(4) Which operator checks value AND type?",
        options: ["==", "=", "===", "!="],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "(5) What is the output of: typeof \"Hello\"?",
        options: ["string", "text", "object", "character"],
        correctAnswer: 0
      },
      {
        id: 6,
        question: "(6) Which function converts a string to an integer?",
        options: ["parseInt()", "stringToInt()", "convertToNumber()", "number()"],
        correctAnswer: 0
      },
      {
        id: 7,
        question: "(7) Which is NOT a JavaScript data type?",
        options: ["Number", "Boolean", "Undefined", "Character"],
        correctAnswer: 3
      },
      {
        id: 8,
        question: "(8) How do you define a function in JavaScript?",
        options: ["function myFunc() {}", "define myFunc() {}", "set myFunc() {}", "create function myFunc() {}"],
        correctAnswer: 0
      },
      {
        id: 9,
        question: "(9) Which symbol is used for single-line comments?",
        options: ["/* */", "<!-- -->", "//", "<>"],
        correctAnswer: 2
      },
      {
        id: 10,
        question: "(10) Which method adds a new element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0
      }
    ];
var questionText = document.querySelector(".question-text");
var answerOptions = document.querySelectorAll(".answer-option span");
var currentQuestion = 0;
var sidebarDiv = document.querySelector(".sidebar-div");
var markedQuestions = [];


var inputs = document.querySelectorAll(".answer-option input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].value = i;
  

  inputs[i].onclick = function() {
    var selectedIndex = parseInt(this.value);
    var questionId = questionsList[currentQuestion].id;
    sessionStorage.setItem("question_" + questionId, selectedIndex);
  };
}

function showQuestion(index) {
  var q = questionsList[index];

  if (!questionText || answerOptions.length < 4) {
    console.error("Elements not found in DOM!");
    return;
  }

  questionText.textContent = q.question;
  answerOptions[0].textContent = q.options[0];
  answerOptions[1].textContent = q.options[1];
  answerOptions[2].textContent = q.options[2];
  answerOptions[3].textContent = q.options[3];

  var radios = document.querySelectorAll(".answer-option input");
  for (var i = 0; i < radios.length; i++) {
    var storedAnswer = sessionStorage.getItem("question_" + q.id);
    radios[i].checked = (storedAnswer != null && parseInt(storedAnswer) === i);
  }


  document.getElementById("number-questions").textContent = `Question ${currentQuestion + 1} of ${questionsList.length}`;
}

showQuestion(currentQuestion);

function nextQuestion() {
  if (currentQuestion < questionsList.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
   
  } else {
   
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  } else {
    
  }
}


// ****************************************** Mark Question***************************************

function markThisQuestion() {
  var qId = questionsList[currentQuestion].id;
  var index = markedQuestions.indexOf(qId);

  if (index === -1) {
    markedQuestions.push(qId);

    var newMark = document.createElement("div");
    newMark.textContent = "Question " + qId;
    newMark.className = "marked-question";

    newMark.onmouseover = function() {
       newMark.style.fontWeight = "bold";
    };
    newMark.onmouseout = function() {
      newMark.style.fontWeight = "normal";
    };

    newMark.onclick = function() {
      for (var i = 0; i < questionsList.length; i++) {
        if (questionsList[i].id === qId) {
          currentQuestion = i;
          showQuestion(currentQuestion);
          break;
        }
        }
      markedQuestions.splice(index, 1);
      sidebarDiv.removeChild(newMark);
    };

    sidebarDiv.appendChild(newMark);

  } else {
    
  }
}


// **************************************Submit Exam*******************************************88

function submitQuiz() {
  var score = 0;

  for (var i = 0; i < questionsList.length; i++) {
    var storedAnswer = sessionStorage.getItem("question_" + questionsList[i].id);
    if (storedAnswer != null && parseInt(storedAnswer) === questionsList[i].correctAnswer) {
      score++;
    }
  }
  window.location.replace('/resultPage.html');
  localStorage.setItem("score",score);
}

var score = localStorage.getItem("score");
if (!score) score = 0;
let scoreText = document.getElementById("score-id");


localStorage.setItem("score", score);
if (!window.location.pathname.includes("resultPage.html") && document.querySelector(".question-text")) {
  showQuestion(currentQuestion);
}


let scoreDiv = document.getElementById("score-id");
if (scoreDiv) {
  let score = localStorage.getItem("score") || 0;
  let total = localStorage.getItem("totalQuestions") || 100;
  let percentage = Math.round((score / total) * 1000);

  scoreDiv.innerHTML = `<h3>${percentage}%</h3>`;
  scoreDiv.style.setProperty("--score", percentage);

  let progress = 0;
  let animation = setInterval(() => {
    if (progress >= percentage) {
      clearInterval(animation);
    } else {
      progress++;
      scoreDiv.style.background = `conic-gradient(#ff710f ${progress * 3.6}deg, #f5f5f5 0deg)`;
      scoreDiv.innerHTML = `<h3>${progress}%</h3>`;
    }
  }, 30);
}

let totalTime = 300;
let timeLeft = totalTime;

function startTimer() {
  const timerElement = document.getElementById("timer");
  const progressBar = document.getElementById("progressBar");

  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerElement.innerText = "Time’s up!";
      progressBar.style.width = "0%";
      return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    const progressWidth = (timeLeft / totalTime) * 100;
    progressBar.style.width = `${progressWidth}%`;

    timeLeft--;
  }, 1000);
}

startTimer();

