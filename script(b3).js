const questions=[
    {
        question:" What does JSON.parse() do in JavaScript?",
        answer:[
            { text : " Converts a JSON string into a JavaScript object",correct: true},
            { text : "Converts a JavaScript object into a JSON string",correct: false},
            { text : "Validates a JSON string",correct: false},
            { text : " None of the above",correct: false},
        ]
    },
    {
        question:"Which of the following is used to stop a loop in JavaScript?",
        answer:[
            { text : "break",correct: true},
            { text : "continue",correct: false},
            { text : "exit",correct: false},
            { text : "stop",correct: false},
        ] 
    },
    {
        question:"What does the this keyword refer to in JavaScript?",
        answer:[
            { text : "the current function",correct: false},
            { text : "the currnt object",correct: true},
            { text : "the global scope",correct: false},
            { text : "none of the above",correct: false},
        ]  
    },
    {
        question:"What is the purpose of the localStorage object in JavaScript?",
        answer:[
            { text : " To store data on the server",correct: false},
            { text : "To store data temporarily in the browser",correct: false},
            { text : "To store data permanently in the browser",correct: true},
            { text : "To send data to the server",correct: false},
        ] 
    },
    {
        question:"Which of the following is used to define a function in JavaScript?",
        answer:[
            { text : "function myFunction() {}",correct: true},
            { text : "def myFunction() {}",correct: false},
            { text : "create function myFunction() {}",correct: false},
            { text : "fun myFunction() {}",correct: false},
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