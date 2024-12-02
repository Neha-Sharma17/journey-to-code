const questions=[
    {
        question:"What is the purpose of the <!DOCTYPE> declaration in HTML?",
        answer:[
            { text : "To specify the HTML version used in the document",correct: true},
            { text : " To link the HTML file to a CSS file",correct: false},
            { text : "To include JavaScript in an HTML file",correct: false},
            { text : "To define the structure of an HTML document",correct: false},
        ]
    },
    {
        question:"Which of the following HTML tags is used to define a navigation section for links?",
        answer:[
            { text : "nav",correct: true},
            { text : "section",correct: false},
            { text : "header",correct: false},
            { text : "footer",correct: false},
        ] 
    },
    {
        question:"Which tag is used to define a section of content that is unrelated to the rest of the page?",
        answer:[
            { text : "section",correct: false},
            { text : "article",correct: false},
            { text : "aside",correct: true},
            { text : "div",correct: false},
        ]  
    },
    {
        question:"How do you make an image responsive in HTML?",
        answer:[
            { text : "Use the (img) tag with the width and height attributes",correct: false},
            { text : " Use the max-width: 100% CSS property",correct: false},
            { text : "Use the (picture) tag for responsive images",correct: false},
            { text : "All of the above",correct: true},
        ] 
    },
    {
        question:" Which HTML element is used to specify an alternative text description for images?",
        answer:[
            { text : "src",correct: false},
            { text : "alt",correct: true},
            { text : "title",correct: false},
            { text : "description",correct: false},
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