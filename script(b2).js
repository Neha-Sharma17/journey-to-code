const questions=[
    {
        question:"Which of the following is the correct way to open a file in Python for reading?",
        answer:[
            { text : "open('file.txt', 'r')",correct: true},
            { text : "open('file.txt', 'w')",correct: false},
            { text : "open('file.txt', 'rw')",correct: false},
            { text : "open('file.txt', 'rb')",correct: false},
        ]
    },
    {           
        question:"Which keyword is used to define a class in Python?",
        answer:[
            { text : "def",correct: false},
            { text : "object",correct: false},
            { text : "type",correct: false},
            { text : "class",correct: true},
        ] 
    },
    {
        question:"What is the correct syntax to import the math module in Python?",
        answer:[
            { text : "from math import *",correct: false},
            { text : "include math",correct: false},
            { text : "import math",correct: true},
            { text : "require math",correct: false},
        ]  
    },
    {
        question:"How can you check if a key exists in a dictionary in Python?",
        answer:[
            { text : "key in dict",correct: true},
            { text : "dict.has_key(key)",correct: false},
            { text : "key.exist(dict)",correct: false},
            { text : "key in dict.keys()",correct: false},
        ] 
    },
    {
        question:"Which of the following Python operators is used for exponentiation?",
        answer:[
            { text : "^",correct: false},
            { text : "**",correct: true},
            { text : "//",correct: false},
            { text : "%%",correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score= 0 ;
    nextbutton.innerHTML =" NEXT";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo +"."+currentQuestion.question;

    currentQuestion.answer.forEach(answer=>{
        const button =document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display ="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === 'true';
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextbutton.style.display ='block';
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out  of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}


nextbutton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();