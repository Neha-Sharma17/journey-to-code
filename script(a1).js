const questions=[
    {
        question:"Which of the following properties can be used to add space between the content and the border of an element?",
        answer:[
            { text : "padding",correct: true},
            { text : "margin",correct: false},
            { text : "border-spacing",correct: false},
            { text : "width",correct: false},
        ]
    },
    {
        question:"Which CSS property is used to change the text color of an element?",
        answer:[
            { text : "font-color",correct: false},
            { text : "text-color",correct: false},
            { text : "color",correct: true},
            { text : "background-color",correct: false},
        ] 
    },
    {
        question:"How do you make a list item in an unordered list appear as a square rather than a bullet?",
        answer:[
            { text : "list-style-type: square;",correct: true},
            { text : "list-style-type: circle;",correct: false},
            { text : "list-style-type: none;",correct: false},
            { text : "list-style: square;",correct: false},
        ]  
    },
    {
        question:"What value of the display property makes an element behave like a block-level element?",
        answer:[
            { text : "inline",correct: false},
            { text : "block",correct: true},
            { text : "flex",correct: false},
            { text : "none",correct: false},
        ] 
    },
    {
        question:"What is the default value of the position property in CSS?",
        answer:[
            { text : "fixed",correct: false},
            { text : "absolute",correct: false},
            { text : "relative",correct: false},
            { text : "static",correct: true},
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