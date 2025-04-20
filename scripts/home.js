document.addEventListener("DOMContentLoaded", () => {
    const headerText = document.getElementById("header-txt");
    const quizList = document.getElementById("quiz-list");

    let currentUser= localStorage.getItem("currentUser");
    if (currentUser) {
        headerText.textContent = `Welcome ${currentUser}! Please Select a quiz`;
    }
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.forEach(quiz => {
        let listItem = document.createElement("li");
        listItem.textContent = quiz.name;
        listItem.addEventListener("click", () => {
            localStorage.setItem("selectedQuiz", quiz.name);
            window.location.href = "quiz.html";
        });
        quizList.appendChild(listItem);
    });
});