document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const clearDataButton = document.getElementById("clear-data-btn");
    const returnLoginButton = document.getElementById("return-login-btn");
  
    console.log("dash.js: DOMContentLoaded");
  
    function populateUserScores() {
    console.log("dash.js: populateUserScores() called");
    usersTableBody.innerHTML = "";
    try {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log("dash.js: users from localStorage:", users);
  
    if (users && Array.isArray(users)) {
    users.forEach(user => {
    console.log("dash.js: Processing user:", user);
    const username = user.username;
    const scores = user.scores;
    console.log("dash.js: User:", username, "Scores:", scores);
  
    if (scores && Object.keys(scores).length > 0) {
    Object.keys(scores).forEach(quizName => {
    const score = scores[quizName];
    console.log("dash.js: User:", username, "Quiz:", quizName, "Score:", score);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>${quizName}</td><td>${score}</td>`;
    usersTableBody.appendChild(tr);
    });
    } else {
    console.log("dash.js: User:", username, "No quizzes taken or scores empty");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>No quizzes taken</td><td>-</td>`;
    usersTableBody.appendChild(tr);
    }
    });
    } else {
    console.log("dash.js: No users found in localStorage or users is not an array");
    }
    } catch (error) {
    console.error("dash.js: Error in populateUserScores:", error);
    }
    }
  
    populateUserScores();
  
    clearDataButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to DELETE ALL local data?")) {
    localStorage.clear();
    alert("All local data has been cleared!");
    location.reload();
    window.location.href = "credentials.html";
    }
    });
  
    returnLoginButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "credentials.html";
    });
   });