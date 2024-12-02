const questions=[
    {
        question:"HTML stands for what?",
        answer:[
            { text : "Hyperlinks and Text Markup Languge",correct: false},
            { text : "HyperText Markup Language",correct: true},
            { text : "Home Tool Markup Language",correct: false},
            { text : "Hyper Tool Mrarkup Language",correct: false},
        ]
    },
    {
        question:"Which tag is  used to define the most important heading in html?",
        answer:[
            { text : "h6",correct: false},
            { text : "div",correct: false},
            { text : "title",correct: false},
            { text : "h1",correct: true},
        ] 
    },
    {
        question:"What is the purpose of the alt attribute in the <img> tag?",
        answer:[
            { text : "to define height of the image",correct: false},
            { text : "it provide a tooltip to the image",correct: false},
            { text : "it provide alternative text if image cann't load",correct: true},
            { text : "it define file type ofthe image",correct: false},
        ]  
    },
    {
        question:"Which of the following tag is used to create a hyperlink?",
        answer:[
            { text : "img",correct: false},
            { text : "a",correct: false},
            { text : "link",correct: false},
            { text : "href",correct: true},
        ] 
    },
    {
        question:"How do u create a numbered list in HTML?",
        answer:[
            { text : "ul",correct: false},
            { text : "ol",correct: true},
            { text : "br",correct: false},
            { text : "list",correct: false},
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