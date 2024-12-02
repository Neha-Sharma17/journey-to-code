const questions=[
    {
        question:"What is JavaScript and how it is use in web development?",
        answer:[
            { text : "A programminng language for server-side scripting",correct: false},
            { text : "A Markup Language for web page structure",correct: false},
            { text : "A progrmming language primiraly for client-side scripting",correct: true},
            { text : "A style sheet language for web design",correct: false},
        ]
    },
    {
        question:"How can you create a variable in JavaScript?",
        answer:[
            { text : "var",correct: false},
            { text : "const",correct: false},
            { text : "let",correct: false},
            { text : "all of the above",correct: true},
        ] 
    },
    {
        question:"What is the correct syntax of display 'Hello,World!' in an alert box?",
        answer:[
            { text : "msg('Hello,World!')" ,correct: false},
            { text : "alertBox('Hello,World!')",correct: false},
            { text : "alert('Hello,World!')",correct: true},
            { text : "console.log('Hello,World!')",correct: false},
        ]  
    },
    {
        question:"What datatype is null in JavaScript?",
        answer:[
            { text : "object",correct: true},
            { text : "undefiend",correct: false},
            { text : "number",correct: false},
            { text : "string",correct: false},
        ] 
    },
    {
        question:"What is NaN in JavaScript?",
        answer:[
            { text : "Not a Null",correct: false},
            { text : "Not a Number",correct: true},
            { text : "No assigned Number",correct: false},
            { text : "None assigned Number",correct: false},
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