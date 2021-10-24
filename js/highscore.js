let result = "";
let h3 = document.getElementById("h3");

function highScores() {
  // get the saved high scores
  testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  //create and add li(s)aka scores
  let aScore = "";
  for (let i = 0; i < testScores.length; i++) {
    aScore +=
      "<li>" +
      `${i + 1} .` +
      " " +
      testScores[i][0] +
      ": " +
      testScores[i][1] +
      "</li>";
  }
  document.getElementById("order").innerHTML = aScore;
  displayresult();
  localStorage.removeItem("testResult");
} //end of highscores

function displayresult() {
  result = localStorage.getItem("testResult");
  // if they compleated quiz
  if (result === null) {
    h3.innerHTML = "You've completed this quiz: did you made the highscores!!!";
  } else {
    //if they result or clicked the link or cleared the scores
    h3.innerHTML = `${result}`;
  }
}
//clears local storage
function clearHigh() {
  window.localStorage.clear();
  result = "To take the quiz click Go Back";
  localStorage.setItem("testResult", result);
  highScores();
}