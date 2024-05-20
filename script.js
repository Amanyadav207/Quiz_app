const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionCounterElement = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1
    },
];

let shuffledQuestions, currentQuestionIndex;
let score = 0;

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.style.display = 'flex';
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    questionCounterElement.innerText = `Question: ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    progressElement.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index, question.answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selected, correct) {
    const buttons = Array.from(answerButtonsElement.children);
    if (selected === correct) {
        score+=10;
        scoreElement.innerText = `Score: ${score}`;
        buttons[selected].classList.add('correct');
    } else {
        buttons[selected].classList.add('wrong');
    }

    buttons.forEach(button => button.disabled = true); // Disable all buttons

    setTimeout(() => {
        buttons.forEach(button => {
            button.classList.remove('correct', 'wrong');
            button.disabled = false; // Re-enable all buttons
        });
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            localStorage.setItem('mostRecentScore', score);
            window.location.assign('end.html');
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', startGame);
