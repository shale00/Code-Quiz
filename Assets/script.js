// Step 1 WHEN I click the start button
// THEN a timer starts and I am presented with a question

//Global Variables
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
var questionIndex = 0;
var timeLeft = 150;

//Question object array
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

//Start button event listener
startButton.addEventListener("click",countdown);

//Function to start the quiz and the countdown that calls the question cycle function
function countdown() {
    quizStart.setAttribute("style","display: none");

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            countdownEl.textContent = timeLeft;
            timeLeft--;
            console.log("timer");
        } else {
            clearInterval(timeInterval);
            endGame();    
        }
    }, 1000);
    questionCycle();
}

//Function to loop through the questions in the object array
function questionCycle() {
    console.log(questionIndex);
    questionBox.setAttribute("style","display: block");

    for (var i = 0; i <= questions.length; i++) {
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

//Answer button event listeners that call a respective function for each answer
buttonOne.addEventListener("click", choice1);
buttonTwo.addEventListener("click", choice2);
buttonThree.addEventListener("click", choice3);
buttonFour.addEventListener("click", choice4);

//Answer button functions to test the answer
function choice1(){
    userAnswer(0);
}

function choice2(){
    userAnswer(1);
}

function choice3(){
    userAnswer(2);
}

function choice4(){
    userAnswer(3);
}

//User answer fuction to compare the user choice to the correct answer and then call the question cycle function
function userAnswer(event) {
    if (questions[questionIndex].answer === questions[questionIndex].choices[event]) {
        console.log("correct");
    } else {
        timeLeft = timeLeft - 10;
        console.log("wrong");
    }
    questionCycle(questionIndex++);

    if (questionIndex >= questionIndex.length){
        endGame();
    }
}
//Step 4 WHEN all questions are answered or the timer reaches 0
// THEN the game is over

//End Game function to display score and submit initials
function endGame() {
    quizStart.setAttribute("style","display: none;");
    scoreDisplay.setAttribute("style","display: block");
    questionBox.setAttribute("style","display: none");
    timerEl.textContent = "Game Over!"
}

// Step 5 WHEN the game is over
// THEN I can save my initials and score