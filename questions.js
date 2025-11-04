
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

// if(document.body.classList.contains(".question")){
// console.log("hi");
// العنصر اللي هيظهر فيه نص السؤال
var questionText = document.querySelector(".question-text");

// عناصر الإجابات
var answerOptions = document.querySelectorAll(".answer-option span");

// مؤشر السؤال الحالي
var currentQuestion = 0;

// العنصر اللي هيعرض قائمة الأسئلة المتعلمه ب mark
var sidebarDiv = document.querySelector(".sidebar-div");
//عملت array نخزن فيها الاساله المتعلم عليها
var markedQuestions = [];


//عايزن نخزن الاجابات في ال session storagge

// Assign قيمة لكل input value (0,1,2,3)
var inputs = document.querySelectorAll(".answer-option input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].value = i;
  

  // كل ما المستخدم يختار إجابة نخزنها في sesion storage
  inputs[i].onclick = function() {
    var selectedIndex = parseInt(this.value);
    var questionId = questionsList[currentQuestion].id;
    sessionStorage.setItem("question_" + questionId, selectedIndex);
  };
}


// // Function لعرض السؤال الحالي مع اختيار الإجابات السابقة
// function showQuestion(index) {
//   var q = questionsList[index];

//   questionText.textContent = q.question;
//   answerOptions[0].textContent = q.options[0];
//   answerOptions[1].textContent = q.options[1];
//   answerOptions[2].textContent = q.options[2];
//   answerOptions[3].textContent = q.options[3];

//   var radios = document.querySelectorAll(".answer-option input");
//   for (var i = 0; i < radios.length; i++) {
//     //  لو فيه إجابة مخزنة سابقًا في sessionStorage، نخليها متعلمه
//     var storedAnswer = sessionStorage.getItem("question_" + q.id);
//     radios[i].checked = (storedAnswer != null && parseInt(storedAnswer) === i);
//   }
// }


// // Timer (10 minutes)
// let totalTime = 10 * 60; // 10 دقائق = 600 ثانية
// let remainingTime = totalTime;

// let timerDisplay = document.getElementById("timer");
// let timeBar = document.getElementById("time-bar");

// let countdown = setInterval(function() {
//   let minutes = Math.floor(remainingTime / 60);
//   let seconds = remainingTime % 60;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   // تحديث النص
//   timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;

//   // تحديث الشريط
//   let progressPercent = (remainingTime / totalTime) * 100;
//   timeBar.style.width = progressPercent + "%";

//   remainingTime--;

//   if (remainingTime < 0) {
//     clearInterval(countdown);
//     alert(" Time is up! Submitting your quiz...");
//     submitQuiz();
//   }
// }, 1000);



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
  // updateProgressBar(index, questionsList.length)
   

  // في نهاية دالة showQuestion
document.getElementById("number-questions").textContent = `Question ${currentQuestion + 1} of ${questionsList.length}`;



}



// أول ما الصفحة تفتح، نعرض السؤال الأول
showQuestion(currentQuestion);


// Next / Previous Buttons

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


// Mark Question

function markThisQuestion() {
  var qId = questionsList[currentQuestion].id;
  var index = markedQuestions.indexOf(qId);

  if (index === -1) {
    // لو السؤال مش موجود نضيفه
    markedQuestions.push(qId);

    var newMark = document.createElement("div");
    newMark.textContent = "Question " + qId;
    newMark.className = "marked-question";

    //  لما اقف علي السؤال في ال list يعمل بولد
    newMark.onmouseover = function() {
       newMark.style.fontWeight = "bold";
    };
    newMark.onmouseout = function() {
      newMark.style.fontWeight = "normal";
    };

    //لما المستخدم يضغط على السؤال في اـ sidebaق
    newMark.onclick = function() {
      // نرجع السؤال الحالي
      for (var i = 0; i < questionsList.length; i++) {
        if (questionsList[i].id === qId) {
          currentQuestion = i;
          showQuestion(currentQuestion);
          break;
         

        }
        }
      // بعد الرجوع، نشيل السؤال من marked questions
      markedQuestions.splice(index, 1);
      sidebarDiv.removeChild(newMark);
    };

    sidebarDiv.appendChild(newMark);

  } else {
    
  }
}


// Submit Exam

function submitQuiz() {
  var score = 0;

  for (var i = 0; i < questionsList.length; i++) {
    var storedAnswer = sessionStorage.getItem("question_" + questionsList[i].id);
    if (storedAnswer != null && parseInt(storedAnswer) === questionsList[i].correctAnswer) {
      score++;
    }
  }
  // window.location.href('/resultPage.html');
  window.open('/resultPage.html')
  localStorage.setItem("score",score);
  // alert("Your score is: " + score + " out of " + questionsList.length);

}




var score = localStorage.getItem("score");

if (!score) score = 0;

// let scoreContainer = document.getElementById("score-id");
let scoreText = document.getElementById("score-id");

// scoreText.innerText=`${score}%`;
// scoreText.textContent = `sgsgsgsgsg${score}%`;
// scoreText.style.backgroundColor='red';

// scoreContainer.style.background = `conic-gradient(#4caf50 ${score * 3.6}deg, #ddd 0deg)`;





    
localStorage.setItem("score", score);
// window.location.href = "resultPage.html";
// Only run quiz-related code if we're on the quiz page
if (!window.location.pathname.includes("resultPage.html") && document.querySelector(".question-text")) {
  // تعريف المتغيرات showQuestion call ... إلخ
  showQuestion(currentQuestion);
  // لا تقم بعمل redirect هنا
}



// ✅ الكود ده آمن يشتغل في أي صفحة (أسئلة أو نتيجة)

// نحاول نجيب عنصر النتيجة
let scoreDiv = document.getElementById("score-id");

// نتحقق لو إحنا في صفحة النتيجة (العنصر موجود)
if (scoreDiv) {
  let score = localStorage.getItem("score") || 0;
  let total = localStorage.getItem("totalQuestions") || 100;
  let percentage = Math.round((score / total) * 100);

  scoreDiv.innerHTML = `<h3>${percentage}%</h3>`;
  scoreDiv.style.setProperty("--score", percentage);

  // نبدأ الأنيميشن التدريجي
  let progress = 0;
  let animation = setInterval(() => {
    if (progress >= percentage) {
      clearInterval(animation);
    } else {
      progress++;
      scoreDiv.style.background = `conic-gradient(#2fa36d ${progress * 3.6}deg, #f5f5f5 0deg)`;
      scoreDiv.innerHTML = `<h3>${progress}%</h3>`;
    }
  }, 20);
}
let totalTime = 600; // 10 دقائق = 600 ثانية

function startTimer() {
  const timerElement = document.getElementById("timer");
  const progressBar = document.querySelector(".div-progressgreen"); // صححنا الاختيار

  const timer = setInterval(() => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    // شريط التحميل
    const percent = ((600 - totalTime) / 600) * 100;
    progressBar.style.width = `${percent}%`;

    if (totalTime <= 0) {
      clearInterval(timer);
      submitQuiz(); // نفذ الدالة عند انتهاء الوقت
    }

    totalTime--;
  }, 1000);
}

window.addEventListener("load", () => {
  showQuestion(currentQuestion);
  startTimer();
});
