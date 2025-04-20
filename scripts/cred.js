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
            if (users.some(user => user.email === email)) {
                alert("Email is already registered!");
                return;
            }
            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Welcome.");
            window.location.href = "home.html";
        }
    });

});
