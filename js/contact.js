function validateName() {
    var Name = document.getElementById("name").value;  // Get the name value dynamically
    var nameError = document.getElementById("nameError");
    var regex = /^[A-Za-z\s]{2,}$/;

    if (!regex.test(Name)) {
        nameError.textContent = "Please enter a valid name (alphabets only, minimum 2 characters).";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById("phone").value;  // Get the phone value dynamically
    var phoneError = document.getElementById("phoneError");
    var regex = /^\+91\s\d{10}$/;

    if (!regex.test(phone)) {
        phoneError.textContent = "Please enter a valid phone number (+91 followed by 10 digits).";
        return false;
    } else {
        phoneError.textContent = "";
        return true;
    }
}

function validateEmail() {
    var email = document.getElementById("email").value;  // Get the email value dynamically
    var emailError = document.getElementById("emailError");
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}

function validateForm() {
    var Name = document.getElementById("name").value;  // Get the name dynamically for storing
    var phone = document.getElementById("phone").value;  // Get the phone dynamically for storing
    var email = document.getElementById("email").value;  // Get the email dynamically for storing
    var subject = document.getElementById("subject").value;  // Get the subject dynamically for storing
    var message = document.getElementById("message").value;  // Get the message dynamically for storing

    var isNameValid = validateName();
    var isPhoneValid = validatePhone();
    var isEmailValid = validateEmail();

    // If any of the validations fail, prevent submission
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        alert("Please correct the highlighted errors before submitting the form.");
        return false;
    } else {
        storeData(Name, phone, email, subject, message);
        return true;
    }
}

function storeData(name, phone, email, subject, message) {
    localStorage.setItem("Name", name);
    localStorage.setItem("Phone", phone);
    localStorage.setItem("Subject", subject);
    localStorage.setItem("Email", email);
    localStorage.setItem("Message", message);
}

function clearForm() {
    var form = document.getElementById('contactForm');
    form.reset();  // Reset all form fields to their default values
}

function handleFormSubmit() {
    console.log("Form submitted!");

    if (!validateForm()) {
        return false; // If validation fails, prevent submission
    }

    // Show the overlay and progress indicator
    var overlay = document.getElementById('overlay');
    var progressContainer = document.getElementById('progress-container');
    overlay.style.display = 'block';  // Show the overlay
    progressContainer.style.display = 'block';  // Show the spinner

    // Simulate a processing delay (4 seconds) before showing the success tick
    setTimeout(function() {
        showTick();
    }, 4000);  // Replace with actual form submission or server response delay

    return false;  // Prevent default form submission for demo
}

function showTick() {
    var progressContainer = document.getElementById('progress-container');
    progressContainer.classList.add('show-tick');  // Add class to hide spinner and show the tick mark

    // Optionally hide the overlay after the tick is shown (e.g., 2 seconds later)
    setTimeout(function() {
        document.getElementById('overlay').style.display = 'none';
    }, 2000);  // Hide the overlay after showing the tick

    clearForm();  // Clear the form after submission is complete
}