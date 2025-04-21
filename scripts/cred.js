document.addEventListener("DOMContentLoaded", () => {
    const headerText = document.getElementById("header-txt");
    const authForm = document.getElementById("auth-form");
    const emailField = document.getElementById("email");
    const authButton = document.getElementById("auth-btn");
    const toggleForm = document.getElementById("toggle-form");


    let isRegister = false;


    toggleForm.addEventListener("click", () => {
        isRegister = !isRegister;
        headerText.textContent = isRegister ? "Welcome! Please Register" : "Welcome! Please Log In";
        authButton.textContent = isRegister ? "Register" : "Login";
        emailField.parentElement.classList.toggle("hidden", !isRegister);
        toggleForm.innerHTML = isRegister
            ? `Already have an account? <span>Login</span>`
            : `Don't have an account? <span>Register</span>`;
    });


    function initializeAdmin() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const adminExists = users.some(user => user.username === "admin");


        if (!adminExists) {
            users.push({ username: "admin", email: "admin@quiz.com", password: "admin123", scores: {} });
            localStorage.setItem("users", JSON.stringify(users));
            console.log("cred.js: Admin user initialized.");
        }
    }


    initializeAdmin();


    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const email = isRegister ? emailField.value.trim() : null;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (isRegister) {
            if (users.some(user => user.username === username)) {
                alert("Username already exists!");
                return;
            }
            if (!email || users.some(user => user.email === email)) {
                alert("Email not provided or is already registered!");
                return;
            }
            const newUser = { username, email, password, scores: {} };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Welcome.");
            localStorage.setItem("currentUser", username);
            console.log("cred.js: User", username, "registered, currentUser set to:", localStorage.getItem("currentUser"));
            if (username === "admin" && password === "admin123") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "home.html";
            }
        } else {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem("currentUser", user.username);
                console.log("cred.js: User", user.username, "logged in, currentUser set to:", localStorage.getItem("currentUser"));
                if (user.username === "admin" && user.password === "admin123") {
                    window.location.href = "dashboard.html";
                } else {
                    window.location.href = "home.html";
                }
            } else {
                alert("Invalid credentials. Please try again.");
            }
        }
    });
});