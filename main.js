var registerUsername = document.getElementById("register-userName");
var registerPassword = document.getElementById("register-password");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var registerBtn = document.querySelector(".btn-register");

var loginUsername = document.querySelector(".login-username");
var loginPassword = document.querySelector(".login-password");
var loginBtn = document.querySelector(".btn-login");

function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
        error = document.createElement("small");
        error.classList.add("error-message");
        input.insertAdjacentElement("afterend", error);
    }
    error.textContent = message;
    error.style.color = "red";
    error.style.fontSize = "12px";
}

function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
        error.textContent = "";
    }
}

// ***************************************** Validation******************************************
registerBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    let valid = true;

   
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName.value.trim())) {
        showError(firstName, "Invalid first name");
        valid = false;
    } else clearError(firstName);

    if (!nameRegex.test(lastName.value.trim())) {
        showError(lastName, "Invalid last name");
        valid = false;
    } else clearError(lastName);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Invalid email address");
        valid = false;
    } else clearError(email);

    if (registerPassword.value.length < 4) {
        showError(registerPassword, "Password must be at least 4 characters");
        valid = false;
    } else clearError(registerPassword);

    if (valid) {
        localStorage.setItem("register-userName", registerUsername.value.trim());
        localStorage.setItem("register-password", registerPassword.value.trim());
        window.location.href = "login.html";
    }
});

loginBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    const storedUsername = localStorage.getItem("register-userName");
    const storedPassword = localStorage.getItem("register-password");

    clearError(loginUsername);
    clearError(loginPassword);

    if (
        loginUsername.value.trim() === storedUsername &&
        loginPassword.value.trim() === storedPassword
    ) {
        window.location.href = "qestionsPage.html";
    } else {
        showError(loginPassword, "Invalid username or password");
    }
});  





