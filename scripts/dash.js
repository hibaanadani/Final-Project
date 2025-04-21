document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const clearDataButton = document.getElementById("clear-data-btn");
    const returnLoginButton = document.getElementById("return-login-btn");
  
    function populateUserScores() {
    usersTableBody.innerHTML = "";
    try {
    let users = JSON.parse(localStorage.getItem("users")) || [];
   
  
    users.forEach(user => {
    const username = user.username;
    const scores = user.scores;
   
  
    if (scores && Object.keys(scores).length > 0) {
    Object.keys(scores).forEach(quizName => {
    const score = scores[quizName];
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>${quizName}</td><td>${score}</td>`;
    usersTableBody.appendChild(tr);
    });
    } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${username}</td><td>No quizzes taken</td><td>-</td>`;
    usersTableBody.appendChild(tr);
    }
    });
    } catch (error) {
    console.error("Error in populateUserScores:", error);
    }
    }
   
  
    populateUserScores();
   
  
    clearDataButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to DELETE ALL local data? This includes authentication, quizzes, and user progress.")) {
    localStorage.clear();
    alert("All local data has been cleared!");
    location.reload();
    window.location.href = "credentials.html";
    }
    });
    returnLoginButton.addEventListener("click", () => {
        window.location.href = "credentials.html";
        });
   });
