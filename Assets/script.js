// Step 1 WHEN I click the start button
// THEN a timer starts and I am presented with a question

var startButton = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var countdownEl = document.getElementById("countdown");
var timeUp = document.getElementById("times-up");
var scoreDisplay = document.getElementById("score-display");
var questionTitle = document.getElementById("questionTitle");
var answerOne = document.getElementById("answer-1");
var answerTwo = document.getElementById("answer-2");
var answerThree = document.getElementById("answer-3");
var answerFour = document.getElementById("answer-4");
var quizStart = document.getElementById("quiz-start");
var questionBox = document.getElementById("question-box");

var questions = [
    {
        question:"Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings","other arrays","booleans","all of the above"],
        answer: "all of the above"
    },
    {
        question:"String values must be enclosed within _______ when being assigned to variables.",
        choices:["commas","curly brackets","quotes","parenthesis"],
        answer:"quotes"
    },
    {
        question:"The condition in an if/else statement is enclosed with _______.",
        choices:["quotes","curly brackets","parenthesis","square brackets"],
        answer:"curly brackets"
    },
    {
        question:"Commonly used data types do NOT include:",
        choices:["strings","booleans","alerts","numbers"],
        answer:"alerts"
    }
]

startButton.addEventListener("click",countdown);

function countdown() {
    quizStart.setAttribute("style","display: none");
    var timeLeft = 5;

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            countdownEl.textContent = timeLeft;
            timeLeft--;
            questionCycle();
            console.log("timer");

        } else {
            countdownEl.textContent = "";
            clearInterval(timeInterval);
            timerEl.textContent = "Time's Up!"
            questionBox.setAttribute("style","display: none");
            scoreDisplay.setAttribute("style","display: block");
            
        }
    }, 1000);
    
}

function questionCycle() {
    console.log("question cycle");
    questionBox.setAttribute("style","display: block");

    var questionIndex = 0
    for (var i = 0; i < questions.length; i++) {
        questionTitle.textContent = questions[questionIndex].question;
        answerOne.textContent = questions[questionIndex].choices[0];
        answerTwo.textContent = questions[questionIndex].choices[1];
        answerThree.textContent = questions[questionIndex].choices[2];
        answerFour.textContent = questions[questionIndex].choices[3];
    }
}

//Step 2 WHEN I answer a question
// THEN I am presented with another question

// Step 3 WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

//Step 4 WHEN all questions are answered or the timer reaches 0
// THEN the game is ove

// Step 5 WHEN the game is over
// THEN I can save my initials and score