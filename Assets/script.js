// Step 1 WHEN I click the start button
// THEN a timer starts and I am presented with a question

var startButton = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var countdownEl = document.getElementById("countdown");
var timeUp = document.getElementById("times-up");

startButton.addEventListener("click",countdown);

function countdown() {
    var timeLeft = 5;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            countdownEl.textContent = timeLeft;
            timeLeft--;
            questionCycle();

        } else {
            countdownEl.textContent = "";
            clearInterval(timeInterval);
            timerEl.textContent = "Time's Up!"
            
        }
    }, 1000);
    return;
}

function questionCycle() {

}



//Step 2 WHEN I answer a question
// THEN I am presented with another question

// Step 3 WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

//Step 4 WHEN all questions are answered or the timer reaches 0
// THEN the game is ove

// Step 5 WHEN the game is over
// THEN I can save my initials and score