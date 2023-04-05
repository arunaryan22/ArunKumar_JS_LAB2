//3 params, questions, score, currQuestIndex
function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
}

Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};

Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};

//Function will 3 things
// 1. Validate the answer
// 2. Update the score
// 3. Increment the current index
Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    "Which team won the IPL season 1?",
    ["RCB", "Mumbai Indians", "KKR", "CSK"],
    "CSK"
  ),
  new Question(
    "Which component is used to compile, debug and execute the java programs?",
    ["JRE", "JIT", "JDK", "JVM"],
    "JDK"
  ),
  new Question(
    "Which is not a JavaScript Framework?",
    ["Python Script", "JQuery","Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Who invented Java Programming?",
    ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
    "James Gosling"
  )
];

function showScores() {
  console.log("Scores :-", quiz.score);
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += `<h2 id='score'> Your Score:- ${
    quiz.score
  } <br> Marks percentage is :- ${(quiz.score / questions.length) * 100}% </h2>`;
  document.getElementById("quiz").innerHTML = gameOverHTML;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById("question");
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById("choice" + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn("btn" + i, currOption);
      }
    } 
    showProgress();
  }
}

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById("progress");
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
}

let quiz = new Quiz(questions);

//Load questions
loadQuestions();
