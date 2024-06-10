const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Javascript is linked in HTML using script tag?',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
    ]
  },
  {
    question: 'CSS ia a?',
    answers: [
      { text: 'Used to style HTML', correct: true },
      { text: 'Used to style JS', correct: false},
      { text: 'it is not a language', correct: false },
      { text: 'it is a Cascading Style shade', correct: false }
    ]
  },
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Hyper Text Makeup Language', correct: false },
      { text: 'High Text Markup Language', correct: false },
      { text: 'High Team Markup Language', correct: false }
    ]
  },
  {
    question: 'What is MERN Full Stack Development?',
    answers: [
      { text: 'Combination of Front-end & Back-end', correct:true },
      { text: 'Only Front-end', correct:false },
      { text: 'Only Back-end', correct:false },
      { text: 'Non of them', correct:false }
    ]
  },
  {
    question: 'What technolgies are in froint-end ?',
    answers: [
      { text: 'HTML & CSS', correct:false},
      { text: 'JavaScript', correct:false },
      { text: 'React', correct:false },
      { text: 'Above All', correct:true }
    ]
  },
  {
    question: 'What technolgies are in back-end ?',
    answers: [
      { text: 'MongoDb', correct:false },
      { text: 'Express,js', correct:false },
      { text: 'Above All', correct:true}
    ]
  }
]