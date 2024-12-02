const questions=[
    {
        question:"What is the result of the following expression in JavaScript: [ ] + [ ]?",
        answer:[
            { text : "0",correct: false},
            { text : "undefiend",correct: false},
            { text : "''(empty string)",correct: true},
            { text : "null",correct: false},
        ]
    },
    {
        question:"Which of the following is a valid way to declare a variable in JavaScript?",
        answer:[
            { text : "var myVar;",correct: false},
            { text : "let myVar;",correct: false},
            { text : "const myVar;",correct: false},
            { text : "All of the above",correct: true},
        ] 
    },
    {
        question:"What does the typeof operator do in JavaScript?",
        answer:[
            { text : "Checks the type of a variable or expression",correct: true},
            { text : "Changes the type of a variable",correct: false},
            { text : "Compares two variables' types",correct: false},
            { text : "None of the above",correct: false},
        ]  
    },
    {
        question:"Which of the following is NOT a JavaScript data type?",
        answer:[
            { text : "string",correct: false},
            { text : "array",correct: false},
            { text : "boolean",correct: false},
            { text : "integer",correct: true},
        ] 
    },
    {
        question:"How do you add a new element to the end of an array in JavaScript?",
        answer:[
            { text : "array.add()",correct: false},
            { text : "array.push()",correct: true},
            { text : "array.append()",correct: false},
            { text : "array.insert()",correct: false},
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