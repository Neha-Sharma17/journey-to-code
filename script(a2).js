const questions=[
    {
        question:"Which of the following is the correct way to create a function in Python?",
        answer:[
            { text : "def myFunc():",correct: true},
            { text : "create myFunc():",correct: false},
            { text : "function myFunc():",correct: false},
            { text : "func myFunc():",correct: false},
        ]
    },
    {           
        question:"How do you declare a list in Python?",
        answer:[
            { text : "list = (1, 2, 3)",correct: false},
            { text : "list = {1, 2, 3}",correct: false},
            { text : "list = 1, 2, 3",correct: false},
            { text : "list = [1, 2, 3]",correct: true},
        ] 
    },
    {
        question:"How do you write a comment in Python?",
        answer:[
            { text : "// This is a comment",correct: false},
            { text : "/* This is a comment */",correct: false},
            { text : "# This is a comment",correct: true},
            { text : "<(!-- This is a comment -->)",correct: false},
        ]  
    },
    {
        question:"Which of the following is used to create a new dictionary in Python?",
        answer:[
            { text : "dict = {1, 2, 3}",correct: false},
            { text : "dict = [1, 2, 3]",correct: false},
            { text : "dict = (1, 2, 3)",correct: false},
            { text : "dict = {'key': 'value'}",correct: true},
        ] 
    },
    {
        question:"What does the len() function do in Python?",
        answer:[
            { text : "Returns the type of an object",correct: false},
            { text : "Returns the length of a string or collection",correct: true},
            { text : "Returns the largest element in a collection",correct: false},
            { text : "Returns the last element in a collection",correct: false},
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