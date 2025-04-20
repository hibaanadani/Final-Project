document.addEventListener("DOMContentLoaded", () => {
    const headerText = document.getElementById("header-txt");
    const quizList = document.getElementById("quiz-list");

    let currentUser= localStorage.getItem("currentUser");
    if (currentUser) {
        headerText.textContent = `Welcome ${currentUser}! Please Select a Quiz`;
    }
    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    if (quizzes.length === 0) {
        localStorage.setItem("quizzes", JSON.stringify([
            { name: "Geography & Travel", id: 1 },
            { name: "Movies & TV Shows", id: 2 },
            { name: "Music & Pop Culture", id: 3 },
            { name: "Books & Literature", id: 4 },
            { name: "Animals & Nature", id: 5 },
            { name: "History & Mythology", id: 6 },
            { name: "Sports & Games", id: 7 },
            { name: "Food & Drink", id: 8 }
        ]));
        quizzes = JSON.parse(localStorage.getItem("quizzes"));
    }
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
console.log("Loaded quizzes:", quizzes);