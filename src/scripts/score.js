/*
* ===================================
* Constants and variables
* ===================================
*/

const queryString = window.location.search; // get '?key=value' from search bar

const urlParams = new URLSearchParams(queryString); // get params ex. 'title=html'

const pointsFromParams = urlParams.get("points") // get value associated with 'title' key
const titleFromParams = urlParams.get("title"); // get value associated with 'title' key

let title = titleFromParams.toLowerCase();

let icon = "";
let questions = [];

/*
* ===================================
* Elements
* ===================================
*/

let topicTexts = document.querySelectorAll(".topic-text");
let topicIcons = document.querySelectorAll(".topic-icon");
let iconContainers = document.querySelectorAll(".icon-container");

let scoreText = document.querySelector(".score-number");
let scoreSubTitle = document.querySelector(".score-subtitle");

let playAgainButton = document.querySelector(".play-again-button");

/*
* ===================================
* Functions
* ===================================
*/

function handlePlayAgain(){
    window.location.href = "../index.html";
}

/*
* ===================================
* Events
* ===================================
*/

playAgainButton.addEventListener("click", handlePlayAgain);

/*
* ===================================
* Main programm
* ===================================
*/

fetch("../public/data/data.json") // get the file
.then(response => response.json()) // get response and convert it to json
.then(data => { // do something with data
    let quizData = data.quizzes.find((quiz) => {
        return title == quiz.title.toLowerCase();
    });
    icon = quizData.icon;
    questions = quizData.questions;

    iconContainers.forEach(element =>{
        console.log(title)
        element.classList.add(`${title}-icon`);
    })

    topicIcons.forEach(iconElement => {
        iconElement.setAttribute("src", `../public/${icon}`);
    });

    topicTexts.forEach(text => {
        text.innerText = titleFromParams;
    });

    scoreText.innerText = pointsFromParams;
    scoreSubTitle.innerText = `out of ${questions.length}`;

})
.catch((error) => {
    console.log("ERROR: ", error);
});




