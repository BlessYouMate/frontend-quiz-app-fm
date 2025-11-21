/*
* ===================================
* Constants and variables
* ===================================
*/

const queryString = window.location.search; // get '?key=value' from search bar

const urlParams = new URLSearchParams(queryString); // get params ex. 'title=html'

const titleFromParams = urlParams.get("title") // get value associated with 'title' key

let title = "";
let icon = "";
let questions = [];

let options = [];

let questionCounter = 1;
let isChecked = false;

let points = 0;

/*
* ===================================
* Elements
* ===================================
*/

let topicIcon = document.querySelector(".topic-icon");
let topicText = document.querySelector(".topic-text");
let iconContainer = document.querySelector(".icon-container");

let questionNumber = document.querySelector(".question-number");
let questionText = document.querySelector(".question-text");

let progressBar = document.querySelector(".progress-bar-fill");

let answerButtons = document.querySelectorAll(".answer-button");

let submitAnswerButton = document.querySelector(".submit-answer-button");

let answerTexts = document.querySelectorAll(".answer-text");

let errorContainer = document.querySelector(".error-container");

/*
* ===================================
* Functions
* ===================================
*/

function handleAnswerButton(e){
    if(!isChecked){
        // check the answer
        let checkedAnswerText = e.currentTarget.querySelector("h2");

        if(checkedAnswerText.innerText == questions[questionCounter - 1].answer){
            points++;
            console.log("Correct!");
            console.log("points ", points);

            // add style to current answer
            e.currentTarget.classList.add("correct-outline");
            e.currentTarget.querySelector(".answer").classList.add("correct-background");

            e.currentTarget.querySelector(".correct-icon").style.display = "block";
        }
        else{
            console.log("Wrong!");
            console.log("points ", points);

            // add style to current answer and to correct one
            e.currentTarget.classList.add("incorrect-outline");
            e.currentTarget.querySelector(".answer").classList.add("incorrect-background");

            e.currentTarget.querySelector(".incorrect-icon").style.display = "block";
            answerButtons.forEach(button => {
               if(button.querySelector("h2").innerText == questions[questionCounter - 1].answer){
                    button.querySelector(".correct-icon").style.display = "block";
               }
            });
        }
        isChecked = true;
        answerButtons.forEach(button => {
            button.classList.add("disabled");
        });
        errorContainer.style.display = "none";
    }
    
}

function handleSubmitAnswerButton(){
    if(!isChecked){
        errorContainer.style.display = "flex";
    }
    else{
        if(questionCounter >= questions.length){
            console.log(`Quiz ended, go to score.html sending points=${points} and title=${title}`);
            window.location.href=`./score.html?points=${points}&title=${title}`;
            console.log("Points earned: ", points);
        }
        else{
            isChecked = false;
            answerButtons.forEach(button => {
                button.querySelector(".incorrect-icon").style.display = "none";
                button.querySelector(".correct-icon").style.display = "none";

                button.classList.remove("incorrect-outline");
                button.classList.remove("correct-outline");
                button.querySelector(".answer").classList.remove("incorrect-background");
                button.querySelector(".answer").classList.remove("correct-background");

                button.classList.remove("disabled");
            });
            questionCounter++;
            updateQuestion();
        
            console.log(questionCounter);
        }
    }
    
}

function updateQuestion(){
    questionNumber.innerText = `${questionCounter} out of ${questions.length}`;
    questionText.innerText = questions[questionCounter - 1].question;

    progressBar.style.width = `${(questionCounter / questions.length) * 100}%`;

    options = questions[questionCounter - 1].options;
    for (let i = 0; i < answerTexts.length; ++i) {
        answerTexts[i].innerText = options[i];
    }
}

/*
* ===================================
* Events
* ===================================
*/

answerButtons.forEach(button => {
    button.addEventListener("click", handleAnswerButton);
});

submitAnswerButton.addEventListener("click", handleSubmitAnswerButton);

/*
* ===================================
* Main programm
* ===================================
*/

fetch("../public/data/data.json") // get the file
.then(response => response.json()) // get response and convert it to json
.then(data => { // do something with data
    let quizData = data.quizzes.find((quiz) => {
        return titleFromParams == quiz.title.toLowerCase();
    });

    title = quizData.title;
    icon = quizData.icon;
    questions = quizData.questions;

    // console.log("Title: ", title, "\nIcon: ", icon, "\nQuestions: ", questions);

    iconContainer.classList.add(`${title.toLocaleLowerCase()}-icon`);
    topicIcon.setAttribute("src", `../public/${icon}`);
    topicText.innerText = title;

    updateQuestion();
})
.catch((error) => {
    console.log("ERROR: ", error);
});





