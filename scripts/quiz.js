let selectedQuiz;
let userAnswers = {};
 

 document.addEventListener("DOMContentLoaded", () => {
  selectedQuiz = localStorage.getItem("selectedQuiz");
  const questionContainer = document.getElementById("question-container");
  const submitButton = document.getElementById("submit-btn");
  const headerText = document.getElementById("header-txt");
  const nextQuizButton = document.getElementById("next-quiz-btn");
  const logoutButton = document.getElementById("logout-btn");
 

  if (!selectedQuiz) {
  questionContainer.innerHTML = "<p>No quiz selected. Please go back and choose one.</p>";
  return;
  }
 

  headerText.textContent = `Quiz Topic: ${selectedQuiz}`;
 

  let quizzesData = JSON.parse(localStorage.getItem("quizzesData")) || {};
 

  if (Object.keys(quizzesData).length === 0) {
  quizzesData = {
  "Geography & Travel": [
  { question: "Which country has the most natural lakes?", options: ["Canada", "Russia", "USA"], answer: "Canada" },
  { question: "Which continent has the most countries?", options: ["Europe", "Africa", "Asia"], answer: "Africa" },
  { question: "What is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River"], answer: "Nile River" }
  ],
  "Movies & TV Shows": [
  { question: "Which movie features the quote 'May the Force be with you'?", options: ["Star Wars", "The Matrix", "Interstellar"], answer: "Star Wars" },
  { question: "What is the name of Ross Geller’s second wife?", options: ["Janice", "Rachel", "Emily"], answer: "Emily" },
  { question: "What is the highest-grossing movie of all time?", options: ["Avengers: Endgame", "Avatar", "Titanic"], answer: "Avatar" }
  ],
  "Music & Pop Culture": [
  { question: "Which artist is known as the 'King of Pop'?", options: ["Michael Jackson", "Elvis Presley", "Prince"], answer: "Michael Jackson" },
  { question: "What was the first music video ever played on MTV?", options: ["Thriller", "Video Killed the Radio Star", "Bohemian Rhapsody"], answer: "Video Killed the Radio Star" },
  { question: "Which band recorded the song 'Bohemian Rhapsody'?", options: ["The Beatles", "Queen", "The Rolling Stones"], answer: "Queen" }
  ],
  "Books & Literature": [
  { question: "Who wrote 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Jane Austen", "Emily Dickinson"], answer: "Jane Austen" },
  { question: "What is the name of the witcher Geralt of Rivia's trusted horse?", options: ["Roach", "Shadowfax", "Storm"], answer: "Roach" },
  { question: "Who is the author of the Harry Potter series?", options: ["J.K. Rowling", "J.R.R. Tolkien", "George R.R. Martin"], answer: "J.K. Rowling" }
  ],
  "Animals & Nature": [
  { question: "Which is the largest land animal?", options: ["Elephant", "Hippopotamus", "Giraffe"], answer: "Elephant" },
  { question: "Which bird is known for its ability to mimic human speech?", options: ["Parrot", "Crow", "Eagle"], answer: "Parrot" },
  { question: "Which mammal is capable of true flight?", options: ["Squirrel", "Bat", "Flying Fox"], answer: "Bat" }
  ],
  "History & Mythology": [
  { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln"], answer: "George Washington" },
  { question: "In Greek mythology, who is the god of the underworld?", options: ["Zeus", "Hades", "Poseidon"], answer: "Hades" },
  { question: "The Great Fire of London happened in which year?", options: ["1666", "1776", "1812"], answer: "1666" }
  ],
  "Sports & Games": [
  { question: "Which country won the first-ever FIFA World Cup?", options: ["Brazil", "Uruguay", "Germany"], answer: "Uruguay" },
  { question: "How many players are on a standard soccer team?", options: ["11", "9", "15"], answer: "11" },
  { question: "Which game features a king, queen, rook, bishop, knight, and pawn?", options: ["Checkers", "Go", "Chess"], answer: "Chess" }
  ],
  "Food & Drink": [
  { question: "What is the main ingredient in guacamole?", options: ["Avocado", "Tomato", "Lettuce"], answer: "Avocado" },
  { question: "Which country is known for sushi?", options: ["Japan", "China", "Thailand"], answer: "Japan" },
  { question: "Which type of pasta is shaped like a small rice grain?", options: ["Penne", "Orzo", "Spaghetti"], answer: "Orzo" }
  ]
  };
  localStorage.setItem("quizzesData", JSON.stringify(quizzesData));
  }
 

  let questions = quizzesData[selectedQuiz] || [];
 

  if (questions.length === 0) {
  questionContainer.innerHTML = "<p>No questions available for this quiz.</p>";
  return;
  }
 

  displayQuestions(questions);
  submitButton.addEventListener("click", calculateScore);
 

  nextQuizButton.addEventListener("click", () => {
  window.location.href = "home.html";
  });
 

  logoutButton.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "credentials.html";
  });
 });
 

 function displayQuestions(questions) {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";
 

  questions.forEach((q, index) => {
  let questionBlock = document.createElement("div");
  questionBlock.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
 

  q.options.forEach(option => {
  let btn = document.createElement("button");
  btn.textContent = option;
  btn.addEventListener("click", () => selectAnswer(index, option, q.answer, btn));
  questionBlock.appendChild(btn);
  });
 

  questionContainer.appendChild(questionBlock);
  });
 }
 

 function selectAnswer(index, selectedOption, correctAnswer, btn) {
  userAnswers[index] = { selectedOption, correctAnswer };
 

  let buttons = btn.parentElement.querySelectorAll("button");
  buttons.forEach(button => {
  button.disabled = true;  
  button.style.opacity = 0.6;
  if (button.textContent === correctAnswer) {
  button.style.backgroundColor = "green";
  } else if (button === btn) {
  button.style.backgroundColor = "red";
  }
  });
 }
 

 function calculateScore() {
  let score = 0;
  Object.values(userAnswers).forEach(answer => {
  if (answer.selectedOption === answer.correctAnswer) {
  score++;
  }
  });
 

  let currentUser = localStorage.getItem("currentUser") || "Guest";
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let selectedQuiz = localStorage.getItem("selectedQuiz");
 

  const user = users.find(user => user.username === currentUser);
  if (user) {
  if (!user.scores) {
  user.scores = {};
  }
  user.scores[selectedQuiz] = score;
  localStorage.setItem("users", JSON.stringify(users));
  }
 

  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `You scored ${score} out of ${Object.keys(userAnswers).length}.`;
 

  alert(`Quiz completed! You scored ${score} out of ${Object.keys(userAnswers).length}.`);
 }