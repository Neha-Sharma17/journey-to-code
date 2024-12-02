const questions=[
    {
        question:"What does CSS stand for?",
        answer:[
            { text : "Cascading Style Sheet",correct: true},
            { text : "Color Style Sheet",correct: false},
            { text : "Computer Style Sheet",correct: false},
            { text : "Creative Style Sheet",correct: false},
        ]
    },
    {
        question:"Which CSS property control the size of the text?",
        answer:[
            { text : "font-weight",correct: false},
            { text : "font-style",correct: false},
            { text : "text-size",correct: false},
            { text : "font-size",correct: true},
        ] 
    },
    {
        question:"What is the default value of the position property in CSS?",
        answer:[
            { text : "relativve" ,correct: false},
            { text : "absolute",correct: false},
            { text : "static",correct: true},
            { text : "fixed",correct: false},
        ]  
    },
    {
        question:"Which CSS property controls the space between elements?",
        answer:[
            { text : "margin",correct: true},
            { text : "spacing",correct: false},
            { text : "border",correct: false},
            { text : "padding",correct: false},
        ] 
    },
    {
        question:"What is the purpose of z-index proerty in CSS?",
        answer:[
            { text : "To define the  stacking order of the index",correct: true},
            { text : "To set the transparency of an element",correct: false},
            { text : "To set the size of the element ",correct: false},
            { text : "To add a shadow to an element",correct: false},
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