const questions=[
    {
        question:"Which HTML tag is used to define metadata for an HTML document, such as a description or author?",
        answer:[
            { text : "meta",correct: true},
            { text : "head",correct: false},
            { text : "title",correct: false},
            { text : "link",correct: false},
        ]
    },
    {           
        question:"What is the difference between inline and block-level elements in HTML?",
        answer:[
            { text : " Block-level elements cannot contain inline elements",correct: false},
            { text : "Inline elements are used for layout purposes, while block-level elements are used for text",correct: false},
            { text : "Block-level elements have no styling by default",correct: false},
            { text : "Block-level elements take up the full width, while inline elements only take up as much space as their content",correct: true},
        ] 
    },
    {
        question:"What is the purpose of the data-* attribute in HTML5?",
        answer:[
            { text : "It specifies the data type for form inputs",correct: false},
            { text : "It binds data to an element for JavaScript manipulation",correct: false},
            { text : "It defines custom data for elements",correct: true},
            { text : "It adds metadata to an element for SEO purposes",correct: false},
        ]  
    },
    {
        question:"What is the main advantage of using ARIA roles in HTML?",
        answer:[
            { text : "They make the website look visually appealing",correct: false},
            { text : "They are used to define the layout of the page",correct: false},
            { text : "They help with search engine optimization (SEO)",correct: false},
            { text : "They improve accessibility for screen readers and assistive technologies",correct: true},
        ] 
    },
    {
        question:"What attribute would you use to specify that a form element is required to be filled out before submission?",
        answer:[
            { text : "mandatory",correct: false},
            { text : "required",correct: true},
            { text : "validate",correct: false},
            { text : "checked",correct: false},
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