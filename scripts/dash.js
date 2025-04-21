document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const clearDataButton = document.getElementById("clear-data-btn");
    const selectedQuiz = localStorage.getItem("selectedQuiz");

    // if (currentUser !== "admin") {
    //     alert("Access denied. Only admins can access this page.");
    //     window.location.href = "credentials.html";
    //     return;
    // }

    let userScores = JSON.parse(localStorage.getItem("userScores")) || {};

    function populateUserScores() {
        usersTableBody.innerHTML = "";
        Object.keys(userScores).forEach(username => {
            const quizzes = userScores[username];
            Object.keys(quizzes).forEach(quizName => {
                const score = quizzes[quizName];
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${username}</td><td>${selectedQuiz}</td><td>${score}</td>`;
                usersTableBody.appendChild(tr);
            });
        });
    }

    populateUserScores();

    clearDataButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to DELETE ALL local data? This includes authentication, quizzes, and user progress.")) {
            localStorage.clear();
            alert("All local data has been cleared!");
            location.reload();
        }
    });
});