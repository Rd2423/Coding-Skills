const start = document.getElementById("btn");
const quiz = document.getElementById("quiz");
const high = document.getElementById("high");
const headline = document.getElementById("headline");
const sub = document.getElementById("sub");
let index = 0; //which question
let timer = 99;
let score = "";
let testScores = [];
let testResult = false;

const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answer: [
      ["strings", "wrong"],
      ["booleans", "wrong"],
      ["numbers", "wrong"],
      ["alerts", "right"],
    ],
  },
  {
    question: "The condition in an if/else statement is enclose with ________",
    answer: [
      ["quotes", "wrong"],
      ["curly brackets", "wrong"],
      ["square brackets", "wrong"],
      ["parentheseis", "right"],
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store ________.",
    answer: [
      ["numbers and strings", "wrong"],
      ["other arrays", "wrong"],
      ["boolenas", "wrong"],
      ["all of the above", "right"],
    ],
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables",
    answer: [
      ["commas", "wrong"],
      ["curly brackets", "wrong"],
      ["parenthesis", "wrong"],
      ["quotes", "right"],
    ],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is :",
    answer: [
      ["JavaScript", "wrong"],
      ["terminal/bash", "wrong"],
      ["for loops", "wrong"],
      ["console.log", "right"],
    ],
  },
  {
    question: "Inside which HTML element do we put JavaScript",
    answer: [
      ["scripting", "wrong"],
      ["script", "right"],
      ["javascript", "wrong"],
      ["js", "wrong"],
    ],
  },
  {
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element?",
    answer: [
      [`document.getElementById('demo').innetHTML='Hello World';`, "right"],
      [`document.getElementByName('p').innerHTML='Hello World!';`, "wrong"],
      [`#demo.innerHTML='Hello World!';`, "wrong"],
      [`document.getElement('p').innerHTML='Hello World!';`, "wrong"],
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answer: [
      [`alertBox('Hello World');`, "wrong"],
      [`alert('Hello World');`, "right"],
      [`msg('Hello World');`, "wrong"],
      [`msgBox('Hello World');`, "wrong"],
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answer: [
      ["if(i==5)", "right"],
      ["if i = 5 then", "wrong"],
      ["if i = 5", "wrong"],
      ["if i == 5 then", "wrong"],
    ],
  },
  {
    question:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answer: [
      ["if i <> 5)", "wrong"],
      ["if i =! 5 then", "wrong"],
      ["if (i <> 5)", "wrong"],
      ["if (i!=5)", "right"],
    ],
  },
];

function timerScore() {
  //time countdown
  score = setInterval(function () {
    // when time runs out stop the timer go to highsscores
    if (timer <= 0) {
      clearInterval(score);
      if (testResult === false) {
        // fill the result h3 on high.html
        testResult = "Sorry you've failed this test";
        localStorage.setItem("testResult", testResult);
      }
      newpage(); //goto high.html
    } else {
      // if time is left show time
      document.getElementById("timer").innerHTML = "Time " + timer;
    }
    timer -= 1; // deduct time
  }, 1000); // every second
}

function startQuiz() {
  //randomize answer order
  for (var i = 0; i < questions.length; i++) {
    if (i == 2) {
      //skip  question 3: the answer is all of the above...
      i++;
    }
    k = questions[i].answer.length;
    while (k--) {
      j = Math.floor(Math.random() * questions[i].answer.length);
      tempk = questions[i].answer[k];
      tempj = questions[i].answer[j];
      questions[i].answer[k] = tempj;
      questions[i].answer[j] = tempk;
    }
  }
  //hide unused elements
  start.style.display = "none";
  sub.style.display = "none";

  //start the timer/score
  timerScore();
  //display the question
  headline.innerHTML = questions[index].question;
  headline.style.textAlign = "left";
  quiz.style.margin = "8vh 70px 10px 70px";
  //display the possible answers
  createAnswers();
  //increase counter
  index++;
}

function createAnswers() {
  //adjust style from centered to left
  quiz.style.alignItems = "flex-start";

  //create ol to display answers
  const x = document.createElement("OL");
  x.setAttribute("id", "Ol");
  quiz.appendChild(x);

  // fill the list from ansewrs array
  for (i = 0; i < questions[0].answer.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("id", `li${i}`);
    li.setAttribute("class", "btn");
    //fill the li with a answer
    let text = document.createTextNode(
      `${i + 1}. ${questions[0].answer[i][0]}`
    );
    li.appendChild(text);
    document.getElementById("Ol").appendChild(li);
  }
  // create the right/wrong notifier container
  const para = document.createElement("p");
  const main = document.getElementById("main");
  para.setAttribute("id", `result`);
  main.appendChild(para);

  // add event listener idetifiers for li
  let list1 = document.querySelector("#li0");
  let list2 = document.querySelector("#li1");
  let list3 = document.querySelector("#li2");
  let list4 = document.querySelector("#li3");

  // identifier on all list items
  const border = document.querySelectorAll(".btn");
  //remove border and previous result on mouse over
  border.forEach((el) =>
    el.addEventListener("mouseover", (event) => {
      removeResult();
    })
  );
  // add listeners for which li was clicked, launch neext question pass which li
  list1.addEventListener("click", () => nextquestion(0));
  list2.addEventListener("click", () => nextquestion(1));
  list3.addEventListener("click", () => nextquestion(2));
  list4.addEventListener("click", () => nextquestion(3));
}

function nextquestion(li) {
  //add result of last question
  setResult(li);
  //exit if questions are done
  if (index > questions.length - 1) {
    exit();
  } else {
    //display new question and possible anwsers
    headline.innerHTML = questions[index].question;
    document.getElementById(
      "li0"
    ).innerHTML = `1. ${questions[index].answer[0][0]}`;
    document.getElementById(
      "li1"
    ).innerHTML = `2. ${questions[index].answer[1][0]}`;
    document.getElementById(
      "li2"
    ).innerHTML = `3. ${questions[index].answer[2][0]}`;
    document.getElementById(
      "li3"
    ).innerHTML = `4. ${questions[index].answer[3][0]}`;
  }
  //increse counter
  index++;
}
// sets border adds whether previous q was right or wrong subtracts score for wrong entry
function setResult(li) {
  quiz.style.borderBottom = "solid grey 1px";
  document.getElementById("result").style.display = "block";
  if (questions[index - 1].answer[li][1] === "right") {
    document.getElementById("result").innerHTML = "Correct!";
  } else {
    document.getElementById("result").innerHTML = "Wrong ;(";
    timer = timer - 10;
  }
  play(li); //sound fx
}

//removes border and previous result on mouse over li
function removeResult() {
  quiz.style.border = "none";
  document.getElementById("result").style.display = "none";
}

function exit() {
  //user finished quiz
  testResult = true;
  // change headline
  headline.innerHTML = "All done!";
  // display user score
  sub.style.display = "block";
  sub.innerHTML = `Your score is ${timer}`;
  //add submit initials and score form
  createForm();

  //hide unsued elements
  document.getElementById("Ol").style.display = "none";
  document.getElementById("timer").style.display = "none";
  // stop timer
  clearInterval(score);
}

function createForm() {
  //create the  submit your name + score form
  const x = document.createElement("form");
  x.setAttribute("id", "form");
  quiz.appendChild(x);

  // add input field
  const y = document.createElement("input");
  y.setAttribute("type", "text");
  y.setAttribute("id", "formInput");
  y.setAttribute("placeholder", "asdf");
  y.setAttribute("maxlength", "5");
  document.getElementById("form").appendChild(y);

  //add a submit button
  const button = document.createElement("button");
  button.setAttribute("id", "formButton");
  button.setAttribute("class", "btn");
  button.setAttribute("type", "button");
  document.getElementById("form").appendChild(button);

  let text = document.createTextNode("submit");
  document.getElementById("formButton").appendChild(text);
  // move button over
  button.style.marginLeft = "10px";

  //  last q removeresult on mousenter
  button.addEventListener("mouseenter", removeResult());
  // make the button launch add score which fills highscores and adds this entry
  button.addEventListener("click", () => addScore()); //

  //stop  enter key submit
  let form = document.getElementById("form");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);
} //end of form

function addScore() {
  //get previous scores
  testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  //get  and set current quiz score and user
  let user = document.getElementById("formInput").value;
  if (user === "") {
    user = "A Shy Person";
  }
  const score = timer;
  const scoreValue = [user, score];

  // place score in high score array
  testScores.push(scoreValue);
  //sort scores
  testScores.sort(function (a, b) {
    return b[1] - a[1];
  });
  // limit length
  if (testScores.length > 10) {
    testScores.pop();
  }
  // send scores to storage
  localStorage.setItem("testScores", JSON.stringify(testScores));

  //launch high score page
  newpage();
}

function newpage() {
  location.href = "highscores.html";
}

//play right/wrong soundfx
function play(li) {
  if (questions[index - 1].answer[li][1] === "right") {
    var audio = new Audio("./assets/sounds/correct.mp3");
    audio.play();
  } else {
    var audio = new Audio("./assets/sounds/error.wav");
    audio.play();
  }
}
function highScoresLink() {
  newpage();
  testResult = "To take the quiz click the go back button";
  localStorage.setItem("testResult", testResult);
}
// start call to action
start.addEventListener("click", () => startQuiz());
// view high scores call to action
high.addEventListener("click", () => highScoresLink());