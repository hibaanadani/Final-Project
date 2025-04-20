document.addEventListener("DOMContentLoaded", () => {
    const headerText = document.getElementById("header-txt");
    const quizList = document.getElementById("quiz-list");

    let user = localStorage.getItem("user");
    if (user) {
        headerText.textContent = `Welcome ${currentUser}! Please Select a quiz`;
    }

});