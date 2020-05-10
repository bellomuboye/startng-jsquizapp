const welcomePage = document.querySelector("#welcome-page");
const quizPage = document.querySelector("#quiz-page");
const resultsPage = document.querySelector("#results-page");
const questionText = document.querySelector(".question-text");
const questionOptions = document.querySelector("#question-options");
const scoreCounter = document.querySelector(".score-counter");
const totalScore = document.querySelector(".total-score");
const questionIndex = document.querySelector(".question-index");
const addForm = document.querySelector(".add");
const restartButton = document.querySelector(".restart-btn");
const nextButton = document.querySelector("#next-btn");
const submitButton = document.querySelector("#submit-btn");
const alert = document.querySelector("#alert");
let currentIndex = 0;
let points = 0;

//Adding Event Listeners
addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userName = addForm.add.value.trim();
  document.querySelector(".user-name").textContent = userName;
  document.querySelector(".user-name-result").textContent = userName;
  beginQuiz();
});

restartButton.addEventListener("click", function () {
  window.location.reload();
});

nextButton.addEventListener("click", function () {
  alert.classList.add("hide")
  currentIndex++;
  if (currentIndex + 1 > questionsArr.length) {
    alert.classList.remove("hide");
    alert.textContent = "You have finished answering all questions, Submit your quiz";
  } else {
    showQuestions(questionsArr[currentIndex]);
  }
});

submitButton.addEventListener("click", function () {
  if (currentIndex + 1 < questionsArr.length) {
    alert.classList.remove("hide");
    alert.textContent = "You haven't finished answering all questions";
  } else {
    endQuiz();
  }
});

//Function Creations
function beginQuiz() {
  welcomePage.classList.add("hide");
  quizPage.classList.remove("hide");
  showQuestions(questionsArr[currentIndex]);
}

const showQuestions = (question) => {
  if (questionOptions.firstChild) {
    questionOptions.innerHTML = "";
    questionIndex.innerHTML = "";
    questionText.innerHTML = "";
  }
  questionIndex.textContent = "Question " + (currentIndex + 1);
  questionText.textContent = question.questionText;

  question.questionOptions.forEach((element) => {
    const button = document.createElement("button");
    button.classList.add("question-option");
    button.dataset.typebutton = true;
    button.innerHTML = element.option;
    if (element.correct == "true") {
      button.dataset.correct = true;
    }
    questionOptions.appendChild(button);
  });
  questionOptions.addEventListener("click", checkAnswer);
};

function checkAnswer(event) {
  selectedOption = event.target;
  if (selectedOption.dataset.typebutton) {
    correct = selectedOption.dataset.correct;

    if (correct) {
      points += 10;
      scoreCounter.textContent = points;
    }

    const answerStatus = document.querySelector(
      ".answer-status" + (currentIndex + 1)
    );
    Array.from(questionOptions.children).forEach((button) => {
      button.setAttribute("disabled", "disabled");
      if (correct) {
        selectedOption.classList.add("correct");
        answerStatus.classList.add("correct");
      } else {
        selectedOption.classList.add("wrong");
        answerStatus.classList.add("wrong");
        if (button.dataset.correct) {
          button.classList.add("correct");
          answerStatus.classList.add("correct");
        }
      }
    });
  }
}

function endQuiz() {
  quizPage.classList.add("hide");
  resultsPage.classList.remove("hide");
  totalScore.innerHTML = points;
}

//Questions for Quiz
const questionsArr = [
  {
    questionText: "What language is not among the courses for StartNG FrontEnd",
    questionOptions: [
      { option: "Go", correct: "true" },
      { option: "JavaScript", correct: "false" },
      { option: "HTML", correct: "false" },
      { option: "CSS", correct: "false" },
    ],
  },
  {
    questionText: "What was the entry requirement for StartNG",
    questionOptions: [
      { option: "A coding exam", correct: "false" },
      { option: "Just Registration", correct: "true" },
      { option: "Personality test", correct: "false" },
      { option: "Hack an account", correct: "false" },
    ],
  },

  {
    questionText: "Who is the coordinator for this year's internship",
    questionOptions: [
      { option: "@EniolaAgboola", correct: "false" },
      { option: "@kingabesh", correct: "false" },
      { option: "@xyluz", correct: "true" },
      { option: "@vnwonah", correct: "false" },
    ],
  },
  {
    questionText: "Which of these companies were featured in a FrontEnd Task",
    questionOptions: [
      { option: "ClubHouse", correct: "false" },
      { option: "Google", correct: "false" },
      { option: "PiggyVest", correct: "true" },
      { option: "Microsoft", correct: "false" },
    ],
  },
  {
    questionText: "Bonus: Which was your favourite Task",
    questionOptions: [
      { option: "Task 1", correct: "true" },
      { option: "Task 2", correct: "true" },
      { option: "Task 3", correct: "true" },
      { option: "Task 4", correct: "true" },
    ],
  },
];
