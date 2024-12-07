/*-------------- Constants -------------*/
const soundCorrect = new Audio("assets/correct.mp3");
const soundIncorrect = new Audio("assets/incorrect.mp3");
const soundWinner = new Audio("assets/winner.mp3");


/*----- Cached Element References  -----*/

const quiz = document.getElementById("quiz");
const correctAnswerCount = document.getElementById("correctAnswerCount");
const totalAnswerCount = document.getElementById("totalAnswerCount");
const correctAnswerPercent = document.getElementById("correctAnswerPercent");
const winMessage = document.getElementById("winMessage");
const loseMessage = document.getElementById("loseMessage");
const pathOne = document.getElementById("Path-1");
const pathTwo = document.getElementById("Path-2");

// elements that change in value throughout the game 
/*---------- Variables (state) ---------*/

const state = {
  correctAnswers: 0,
  numberOfQuestions: questions.length,
  currentQuestion: 0,
  selectedArray: undefined,
};

/*-------------- Functions -------------*/

const makeAnswerHTML = (answer, i) => `
    <button onclick='handleAnswerClick("${answer}", ${i})' id=${i}>${answer}</button>
`;

const makeQuestionHTML = (question, i) => {
  const answers = question.answers.map((a) => makeAnswerHTML(a, i)); // TODO: remove commas

  return `
        <div class="question" id=${i}>
            <div class="title">${question.title}</div>
            <div class="answers">${answers}</div>          
        </div>
    `;
};



/*----------- Event Listeners ----------*/

function chooseCategory(path) {

 pathOne.style.visibility = "hidden"
 pathTwo.style.visibility = "hidden"
if (path === pathOne) {

state.selectedArray = questions
state.selectedArray.map((q, i) => {
  quiz.innerHTML += makeQuestionHTML(q, i);
 });

} else if (path === pathTwo) {
  state.selectedArray = questionsTwo
 state. selectedArray.map((q, i) => {
    quiz.innerHTML += makeQuestionHTML(q, i);
   });
};

  console.log(path)

 showNextAnswer();
 }

pathOne.addEventListener("click", function() {
  chooseCategory(pathOne)
});


pathTwo.addEventListener("click", function() {
  chooseCategory(pathTwo)
});





function handleAnswerClick(answer, i) { 
  console.log(answer)
  console.log(i)
  
  const isCorrect = answer === state.selectedArray[i].correctAnswer;

 
    isCorrectAnswer(isCorrect);

  
}
// showing logic to hide each question if it's not the current question in the index, if it's current question then it will be made visible
function showNextAnswer() {
  Array.from(document.querySelectorAll(".question")).forEach((q, i) => {
    if (i !== state.currentQuestion) {
      q.style.visibility = "hidden";
    } else {
      q.style.visibility = "visible";
    }
  });
  onQuizEnd();
}

function isCorrectAnswer(isCorrect) {
  if (isCorrect) {
    state.correctAnswers++;
    soundCorrect.play();
  } else {
    soundIncorrect.play();
  }

  
  state.currentQuestion++;
 
  correctAnswerCount.innerHTML = state.correctAnswers;
  correctAnswerPercent.innerHTML = `${
    (state.correctAnswers / state.numberOfQuestions) * 100
  }%`;
  showNextAnswer();
}



// When quiz ends, make visible the YOU WIN message
function onQuizEnd() {
  const endCondition = state.currentQuestion === state.numberOfQuestions;
  const loseCondition = state.correctAnswers !== 5
  if (endCondition && loseCondition === false) {
    winMessage.style.visibility = "visible";
    soundWinner.play();
  } else if (endCondition && loseCondition === true) {
    soundIncorrect.play();
    loseMessage.style.visibility = "visible";
  }
}

// Logic to run on page load
function onPageLoad() {
  winMessage.style.visibility = "hidden";
loseMessage.style.visibility = "hidden";

  //  questions.map((q, i) => {
  //   quiz.innerHTML += makeQuestionHTML(q, i);
  // });


}

// When the page loads, run the game logic
onPageLoad();
