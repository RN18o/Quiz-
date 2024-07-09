const questions = [
    {
    question: "Javascript is platform?",
    answer: [
    {text: "Independent", correct: false},
    {text: "Dependent", correct: false},
    {text: "Both", correct: false},
    {text: "Independent and portable", correct: true},
    ]
},
{
    question: "Javascript is?",
    answer:[
    {text: "Syncronous", correct:true},
    {text: "Asynccronous",correct: false},
    {text: "Both",correct: false},
    {text: "Await",correct:false},
   ]
},
{
    question: "Who was devolped JavaScript?",
   answer:[
    {text: "Guido Van Rossum", correct:false},
    {text: "Brenden Eich",correct: true},
    {text: "Dennis Ritchie",correct: false},
    {text: "none of these",correct:false},
   ]
},
{
    question: "Who was devolped JavaScript?",
    answer:[
     {text: "1996", correct:false},
     {text: "1995",correct: true},
     {text: "1994",correct: false},
     {text: "none of these",correct:false},
    ]
}
];


const questionElement = document.querySelector("#Question");
const answerButtons = document.querySelector("#answer-btn");
const nextButton = document.querySelector("#nxt-btn");

function startquiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);

    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectanswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true"; 
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startquiz();
    }
})

startquiz();