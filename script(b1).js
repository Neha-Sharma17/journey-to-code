const questions=[
    {
        question:"How can you create a CSS rule that affects all <p> elements inside a <div> element with the class .container?",
        answer:[
            { text : "div p {}",correct: false},
            { text : ".container p {}",correct: true},
            { text : "div.container p {}",correct: false},
            { text : "p.container {}",correct: false},
        ]
    },
    {
        question:"Which of the following properties can be used to center a block element horizontally?",
        answer:[
            { text : "margin: 0 auto;",correct: false},
            { text : "text-align: center;",correct: false},
            { text : "display: flex; justify-content: center;",correct: false},
            { text : " Both A and C",correct: true},
        ] 
    },
    {
        question:" How would you make an element’s background color change when the user hovers over it?",
        answer:[
            { text : "element:hover { background-color: newcolor; }",correct: false},
            { text : "element:hover { background: newcolor; }",correct: false},
            { text : "element:hover { background: newcolor; }",correct: false},
            { text : "Both A and B",correct: true},
        ]  
    },
    {
        question:"Which CSS property is used to create a shadow effect for text?",
        answer:[
            { text : "box-shadow",correct: false},
            { text : "text-shadow",correct: true},
            { text : "shadow",correct: false},
            { text : "text-effect",correct: false},
        ] 
    },
    {
        question:"What is the effect of using box-sizing: border-box; in CSS?",
        answer:[
            { text : "It includes the padding and border in the element's total width and height",correct: true},
            { text : "It adds padding inside the element",correct: false},
            { text : "It removes padding from the element",correct: false},
            { text : " It applies a box shadow to the element",correct: false},
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