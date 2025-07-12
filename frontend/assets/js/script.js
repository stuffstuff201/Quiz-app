async function loadQuestions() {
  const response = await fetch("assets/js/json/hauptstaedte_fragen.json");
  const questions = await response.json();
  return questions;
}

const questionBody = document.getElementById("container-body-question");
const questionP = document.createElement("p");
questionP.id = "questionP";
const buttonStart = document.getElementById("buttonStart");
let score = 0;

const questionsAnswers = await loadQuestions();
startSite();

function startSite() {
  buttonStart.addEventListener("click", () => {
    score = 0;
    questionBody.innerHTML = "";
    showQuestion();
    buttons();
  });
  questionBody.innerHTML = "Welcome! The game is waiting for you!";
}

function showQuestion() {
  questionP.innerHTML = questionsAnswers[score].question;
  questionBody.appendChild(questionP);
}

function buttons() {
  questionsAnswers[score].option.forEach((text, index) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "myButton";
    button.dataset.index = index;
    questionBody.appendChild(button);

    button.addEventListener("click", () => {
      let playerChoice = Number(button.dataset.index);
      console.log(playerChoice);
      return compare(playerChoice);
    });
  });
}

function compare(playerChoice) {
  const answer = questionsAnswers[score].answer;
  if (playerChoice === answer) {
    alert("right!");
    nextQuestion();
  } else {
    questionP.innerHTML = "Game Over! Better luck next time!";
    buttonRemove();
    score = 0;
  }
}

function nextQuestion() {
  console.log("Array.Length :" + questionsAnswers.length);
  score++;
  console.log("Score :" + score);
  if (score >= questionsAnswers.length) {
    alert("DONE");
    endScreen();
    score = 0;
    return;
  }
  questionP.innerHTML = questionsAnswers[score].question;
  buttonRemove();
  buttons();
}

function buttonRemove() {
  const questionButtons = document.querySelectorAll(".myButton");
  questionButtons.forEach((button) => {
    button.remove();
  });
}

function endScreen() {
  questionP.innerHTML = "Your Final Score is: " + score;
  buttonRemove();
}
