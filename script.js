//array constant of questions with the options and which answers are true and false to be displayed to the user
const questions = [
    { 
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },

    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct: false},
        ]
    },
];

//HTML element which contains the h2 tag which asks the questions
const question = document.getElementById("questions");

//HTML element which contains the buttons containing the multiple answers
const answerButtons = document.getElementById("answer-buttons");

//HTML element which contains the button to move to the next question
const nextButton = document.getElementById("next-btn");

//default state variables 
let currentQuestion = 0;
let score = 0;

//function to start the quiz loop which first calls the function "showQuestion"
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//function to show the next question and calls the next functions "resetState" and "selectedAnswer"
function showQuestion() {

    //function to reset the state of the questions
    resetState();

    //setting the variable currentQuestionIndex equal to the array "questions" first created above and passing an empty array "currentQuestion" to it
    let currentQuestionIndex = questions[currentQuestion];

    //setting the variable questionNo to the variable "currentQuestion" and adding 1 to it 
    let questionNo = currentQuestion + 1;

    //passing the information shown below in the constant "question" to replace the value in the HTML file 
    question.innerHTML = questionNo + ". " + currentQuestionIndex.question;

    //creating a loop to iterate through the answers array in the current question
    currentQuestionIndex.answers.forEach(answer => {

        //creating a button for each answer, passing the answers to the buttons, adding a class and appending it to the constant "answerButtons"
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        //function to check if the answer is correct or not
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        //eventlistener to handle click actions on the buttons
        button.addEventListener("click", selectedAnswer);//selectedAnswer function declared below//
    });
}

//function to reset the state of the quiz
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//function to display colors for correct and incorrect answers 
function selectedAnswer(e){

    //setting the parameter e in selectedBtn to target the button where selectedAnswer was first declared 
    const selectedBtn = e.target;

    //setting the isCorrect value strictly to true
    const isCorrect = selectedBtn.dataset.correct === "true";

    //conditional statement to add a class if it is correct and a class if it is wrong 
    if (isCorrect) {

        //if the selectedBtn is correct, then the color of the button will be green
        selectedBtn.classList.add("correct");

        //score increment by 1 for each correct answer
        score++;
    }
    else{
        //if the selectedBtn is incorrect, then the color of the button will be red
        selectedBtn.classList.add("incorrect");
    }

    //code to handle the case where once an answer is clicked the dataset is checked for which is true and is then displayed 
    Array.from(answerButtons.children).forEach(button => {

        //removing the class correct and incorrect from all buttons
        //conditional statement supposing when the wrong answer is clicked the dataset is checked for which is strictly true and adds and displays the class "correct"
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        //disabling the buttons once the condition has been fulfilled to prevent further clicking
        button.disabled = true;
    });

    //displaying the next button once an answer is clicked so that we can go to the next question
    nextButton.style.display = "block"
}

//function to display the final score and the option to restart the quiz 
function showScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//function to switch to the next question after answering the current question
function handleNextButton(){

    //increases the question by 1
    currentQuestion++;

    //checking if the current question is less than the total number of questions
    if(currentQuestion < questions.length){
        showQuestion();
    }
    //if the above condition is not fulfilled then the score will be displayed
    else{
        showScore();//declared above
    }
};

//eventlistener which handles the action of the next button
nextButton.addEventListener("click", ()=>{

    //this checks if the current question is less than the length of the question i.e if total number of questions the quiz has is 4 and the current question is less than 4 then the code below will run
    if(currentQuestion < questions.length){
        handleNextButton();//declared above
    }
    //restarts quiz once the above condition is not fulfilled
    else{
        startQuiz();
    }
})

startQuiz();