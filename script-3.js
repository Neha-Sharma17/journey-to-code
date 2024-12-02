const questions=[
    {
        question:"What is python?",
        answer:[
            { text : "A type of snake",correct: false},
            { text : "A high-level programming language",correct: true},
            { text : "An operating system",correct: false},
            { text : "A web browser",correct: false},
        ]
    },
    {
        question:"Which symbol is used to start a comment in python?",
        answer:[
            { text : "//",correct: false},
            { text : "#",correct: true},
            { text : "\\",correct: false},
            { text : '(\)',correct: false},
        ] 
    },
    {
        question:"How do u create a variable in python?",
        answer:[
            { text : "int a=5" ,correct: false},
            { text : "a=5",correct: true},
            { text : "var a=5",correct: false},
            { text : "let a=5",correct: false},
        ]  
    },
    {
        question:"Which function is used to output text to the screen?",
        answer:[
            { text : "input()",correct: false},
            { text : "output()",correct: false},
            { text : "print()",correct: true},
            { text : "display()",correct: false},
        ] 
    },
    {
        question:"What is the output of 3 + 2 * 2?",
        answer:[
            { text : "10",correct: false},
            { text : "7",correct: true},
            { text : "8 ",correct: false},
            { text : "9",correct: false},
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