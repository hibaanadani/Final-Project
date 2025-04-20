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

});
