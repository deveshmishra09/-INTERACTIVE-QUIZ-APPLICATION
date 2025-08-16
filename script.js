const questions = [
  { question: "Which is the largest planet in our Solar System?", answers: [
    { text: "Earth", correct: false },
    { text: "Jupiter", correct: true },
    { text: "Mars", correct: false },
    { text: "Saturn", correct: false }
  ]},
  { question: "Who invented the light bulb?", answers: [
    { text: "Thomas Edison", correct: true },
    { text: "Nikola Tesla", correct: false },
    { text: "Albert Einstein", correct: false },
    { text: "Isaac Newton", correct: false }
  ]},
  { question: "What is the capital of Japan?", answers: [
    { text: "Seoul", correct: false },
    { text: "Tokyo", correct: true },
    { text: "Kyoto", correct: false },
    { text: "Beijing", correct: false }
  ]},
  { question: "Which is the fastest land animal?", answers: [
    { text: "Cheetah", correct: true },
    { text: "Tiger", correct: false },
    { text: "Horse", correct: false },
    { text: "Leopard", correct: false }
  ]},
  { question: "Which language is used for web apps?", answers: [
    { text: "Python", correct: false },
    { text: "JavaScript", correct: true },
    { text: "C++", correct: false },
    { text: "Java", correct: false }
  ]},
  { question: "What is H2O commonly known as?", answers: [
    { text: "Oxygen", correct: false },
    { text: "Water", correct: true },
    { text: "Hydrogen", correct: false },
    { text: "Salt", correct: false }
  ]},
  { question: "Which planet is known as the Red Planet?", answers: [
    { text: "Venus", correct: false },
    { text: "Mars", correct: true },
    { text: "Jupiter", correct: false },
    { text: "Saturn", correct: false }
  ]},
  { question: "Which is the smallest prime number?", answers: [
    { text: "0", correct: false },
    { text: "1", correct: false },
    { text: "2", correct: true },
    { text: "3", correct: false }
  ]},
  { question: "Which gas do plants absorb?", answers: [
    { text: "Oxygen", correct: false },
    { text: "Carbon Dioxide", correct: true },
    { text: "Nitrogen", correct: false },
    { text: "Hydrogen", correct: false }
  ]},
  { question: "What is the largest mammal?", answers: [
    { text: "Elephant", correct: false },
    { text: "Blue Whale", correct: true },
    { text: "Giraffe", correct: false },
    { text: "Shark", correct: false }
  ]}
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
  nextButton.innerText = 'Next ➡';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    selectedBtn.classList.add('correct');
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerText = 'Play Again 🔄';
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
