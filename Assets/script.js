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
var timeLeft = 20;
var finalScore = document.getElementById("final-score");
var submitForm = document.getElementById("submit-form");
var highScoreBox = document.getElementById("high-scores");
var highScoreList = document.getElementById("high-score-list");
var userInput = document.getElementById("initials");
var clearScores = document.getElementById("clear-scores");
var goBack = document.getElementById("go-back");
var viewHS = document.getElementById("view-high-scores");


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
];

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
    console.log(questionIndex);
    if (questions[questionIndex].answer === questions[questionIndex].choices[event]) {
        console.log("correct");
        // finalScore = finalScore + 10;
    } else {
        timeLeft = timeLeft - 10;
        console.log("wrong");
    }
    
    if (questionIndex === (questionIndex.length -1)){
        endGame();
    } else {
        questionCycle(questionIndex++);

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
    finalScore.textContent = timeLeft;
}

// Step 5 WHEN the game is over
// THEN I can save my initials and score

//Function to retrieve saved scores from local storage and create a list to display them
function displayScores() {
    var userScores = localStorage.getItem("userScores");
    userScores = JSON.parse(userScores);

    if (userScores !== null) {
        for (var i = 0; i < userScores.length; i++) {
            var initials = (userScores[i].user + "  " + userScores[i].score);
            var li = document.createElement("li");
            li.setAttribute("class","list-item");
            li.textContent = (initials);
            highScoreList.appendChild(li);
        }  
    } else {
        return;
    }
  
}

//Function to display a message if there is no user input
function displayMessage(message) {
    console.log("display message");
    var displayMessage = document.createElement("p");
    displayMessage.setAttribute("id","display-message");
    displayMessage.textContent = message;
    scoreDisplay.appendChild(displayMessage);
}


//Event listener and function for submit button
submitForm.addEventListener("click", function(event) {
    //Display message if no input and stop the function
    if (userInput.value === "") {
        displayMessage("Need to enter initials!");
        return;
    //Object to store user input and score    
    } else {
        var userInfo = {
            user: userInput.value,
            score: timeLeft
        };
        //Store the object in local storage
        var userScores = localStorage.getItem("userScores");
        if (userScores === null) {
            userScores = [];
        } else {
            userScores = JSON.parse(userScores);
        }
        //Add user scores to object
        userScores.push(userInfo);
        var newInput = JSON.stringify(userScores);
        localStorage.setItem("userScores", newInput);

        //Display High score list and hide score display
        scoreDisplay.setAttribute("style","display: none;");
        highScoreBox.setAttribute("style","display: block;");

        displayScores();

    }
})


//Event listener and function to clear high scores
clearScores.addEventListener("click", function(event){
    event.preventDefault();
    window.localStorage.clear();
    highScoreList.innerHTML = "";
});

//Event listener and function to refresh the page
goBack.addEventListener("click", function(event){
    location.reload();
});

//Event listener to view the high scores list
viewHS.addEventListener("click", function(event){
    quizStart.setAttribute("style","display: none");
    questionBox.setAttribute("style","display: none;");
    scoreDisplay.setAttribute("style","display: none;");
    highScoreBox.setAttribute("style","display: block;");
    displayScores();
})