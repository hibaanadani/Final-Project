document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const clearDataButton = document.getElementById("clear-data-btn");
    const selectedQuiz = localStorage.getItem("selectedQuiz");

    // const currentUser = localStorage.getItem("currentUser");
    //     if (currentUser !== "admin") {
    //         alert("Access denied. Only admins can access this page.");
    //         window.location.href = "credentials.html";
    //         return; //  <--- return only for non-admins
    //     }

    console.log(JSON.parse(localStorage.getItem("userScores")));
    let userScores = JSON.parse(localStorage.getItem("userScores")) || {};

    function populateUserScores() {
        usersTableBody.innerHTML = "";
        try {
            let userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    
            Object.keys(userScores).forEach(username => {
                if (username) {
                    const quizzes = userScores[username];
                    if (quizzes) {
                        Object.keys(quizzes).forEach(quizName => {
                            if (quizName) {
                                const scores = quizzes[quizName];
                                if (Array.isArray(scores)) {
                                    scores.forEach(score => {
                                        const tr = document.createElement("tr");
                                        tr.innerHTML = `<td>${username}</td><td>${quizName}</td><td>${score}</td>`;
                                        usersTableBody.appendChild(tr);
                                    });
                                } else if (scores !== undefined && scores !== null) {
                                    const tr = document.createElement("tr");
                                    tr.innerHTML = `<td>${username}</td><td>${quizName}</td><td>${scores}</td>`;
                                    usersTableBody.appendChild(tr);
                                }
                            }
                        });
                    }
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
        }
    });
});