function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, c) => {
      const [key, val] = c.split('=');
      return key === name ? JSON.parse(decodeURIComponent(val)) : r;
  }, null);
}

function updateCookie(name, newValue) {
  const existingValues = getCookie(name) || [];
  existingValues.push(newValue);
  setCookie(name, JSON.stringify(existingValues), 7);
}

function validateEmail(email) {
  const re = /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^([6-9]\d{9})$/; // Basic validation for 10-digit phone number
  return re.test(phone);
}

function validateName(name) {
  return name.length >= 3; // Name must be at least 3 characters
}

function validatePassword(password) {
  return password.length >= 6; // Password must be at least 6 characters
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword; // Checks if password and confirm password match
}

function showError(element, message) {
  const errorElement = element.parentElement.querySelector(".error-message");
  errorElement.innerHTML = message + " <span style='color:red;'>*</span>";
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(msg => msg.innerHTML = ""); // Clear text instead of removing the element
}

function validateField(field) {
  clearErrors();
  let isValid = true;

  if (field.type === "text") {
      if (!validateName(field.value)) {
          showError(field, 'Name must be at least 3 characters');
          isValid = false;
      }
  } else if (field.type === "email") {
      if (!validateEmail(field.value)) {
          showError(field, 'Invalid email format');
          isValid = false;
      }
  } else if (field.type === "number") {
      if (!validatePhone(field.value)) {
          showError(field, 'Phone must be a 10-digit number');
          isValid = false;
      }
  } else if (field.type === "password") {
      if (!validatePassword(field.value)) {
          showError(field, 'Password must be at least 6 characters');
          isValid = false;
      }
  }

  return isValid;
}

function register() {
  const form = document.getElementById("form1");
  const inputs = form.querySelectorAll("input");
  let allValid = true;

  inputs.forEach(input => {
      if (!validateField(input)) {
          allValid = false;
      }
  });

  // Get password and confirm password values
  const password = inputs[3].value; // Assuming password is the fourth input
  const confirmPassword = inputs[4].value; // Assuming confirm password is the fifth input

  // Validate confirm password
  if (!validateConfirmPassword(password, confirmPassword)) {
      showError(inputs[4], 'Passwords do not match');
      allValid = false;
  }

  if (allValid) {
      // Store only email and password in cookies
      updateCookie('emails', inputs[1].value);  // Store email
      updateCookie('passwords', inputs[3].value);
      updateCookie('username', inputs[0].value);  // Store password

      alert('Registration successful! Please log in.');
      showLogin();
  }
}

function rotateElement() {
  const box = document.getElementById("box");
  box.style.transition = "transform 0.5s";
  box.style.transform = "rotateY(90deg)";
}

function resetRotation() {
  const box = document.getElementById("box");
  box.style.transition = "transform 0.5s";
  box.style.transform = "rotateY(0deg)";
}

function showRegister() {
  rotateElement();
  setTimeout(() => {
      document.getElementById("welcome").style.display = "none";
      document.getElementById("form1").style.display = "block";
      resetRotation();
  }, 500);
}

function showLogin() {
  const welcome = document.getElementById("welcome");
  const form1 = document.getElementById("form1");
  const forlogin = document.getElementById("forlogin");

  rotateElement();
  setTimeout(() => {
      welcome.style.display = "none";
      form1.style.display = "none";
      forlogin.style.display = "block";
      resetRotation();
  }, 500);
}

function login() {
  const form = document.getElementById("forlogin");
  const inputs = form.querySelectorAll("input");
  const emailInput = inputs[0];
  const passwordInput = inputs[1];
  const storedEmails = getCookie('emails') || [];
  const storedPasswords = getCookie('passwords') || [];

  if (emailInput.value === "") {
      showError(emailInput, 'Email is required');
      return;
  }
  if (passwordInput.value === "") {
      showError(passwordInput, 'Password is required');
      return;
  }

  const userIndex = storedEmails.findIndex(email => email === emailInput.value);

  if (userIndex === -1) {
      showError(emailInput, 'Your ID not found, do the registration');
  } else if (passwordInput.value !== storedPasswords[userIndex]) {
      showError(passwordInput, 'Password is incorrect');
  } else {
      alert('Login successful!'); // Placeholder for successful login action
      window.location.href="landing.html";
  }
}

let darkness = "off";
function dark() {
  const body = document.getElementById("bod");
  const themeButton = document.getElementById("theme");
  const allTextElements = document.querySelectorAll("h2, p, label"); // All text elements
  const inputElements = document.querySelectorAll("input"); // All input elements

  if (darkness === "off") {
      body.style.background = "url(./healthy-food.jpeg), black";
      body.style.backgroundSize = "cover";
      themeButton.style.background = "white";
      themeButton.style.color = "black";
      document.querySelectorAll(".error-message").color="white";
      allTextElements.forEach(el => el.style.color = "white"); // Change all text to white
      inputElements.forEach(input => {
          input.style.borderColor = "white"; // Change input border color to white
          input.style.color = "white"; // Change input text color to white
          input.style.backgroundColor = "transparent"; // Keep background transparent
          input.style.borderBottom ="2px solid #fff7f7";
          
      });
      darkness = "on";
  } else {
      body.style.background = "url(./food-healthy.jpg), black";
      body.style.backgroundSize = "cover";
      themeButton.style.background = "black";
      themeButton.style.color = "white";
      allTextElements.forEach(el => el.style.color = "black"); // Reset all text to black
      inputElements.forEach(input => {
          input.style.borderColor = "black"; // Reset input border color
          input.style.color = "black"; // Reset input text color to black
          input.style.backgroundColor = "transparent";
          input.style.borderBottom ="none"; // Keep background transparent
      });
      darkness = "off";
  }
}
