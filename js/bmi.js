const metricFormContainer = document.getElementById("metricForm");
const usFormContainer = document.getElementById("usForm");
// let result = document.getElementById('result');
function resetForm(form) {
form.reset();
form.classList.remove("was-validated");
result.classList.add("hidden");  // Keep the hidden class when resetting
result.classList.remove("active"); // Ensure the result is not active
}
// bmi category function
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else if (bmi >= 30 && bmi < 39.9) {
        return 'Obese';
    }  else if (bmi >= 40) {
        return 'Severe Obese';
    } else {
        return 'Invalid BMI';
    }
}

let metricButton = document.getElementById("metric-btn");
let usButton = document.getElementById("us-btn");

// Toggling forms on button click
metricButton.addEventListener("click", () => {
    resetForm(document.metricForm);
    metricFormContainer.classList.add("active");
    usFormContainer.classList.remove("active");

    metricButton.classList.add("active");
    usButton.classList.remove("active");
});

usButton.addEventListener("click", () => {
    resetForm(document.usForm);
    usFormContainer.classList.add("active");
    metricFormContainer.classList.remove("active");

    usButton.classList.add("active");
    metricButton.classList.remove("active");
});

// Metric form 
document.metricForm.onsubmit = function (event) {
    event.preventDefault();
    if (this.checkValidity()) {
        const weight = parseFloat(document.getElementById("metric-weight").value);
        const height = parseFloat(document.getElementById("metric-height").value) / 100;
        const bmi = weight / (height * height);

        let bmiCat = getBMICategory(bmi);
        let finalBmi = bmi.toFixed(2);
        result.classList.remove("hidden");
        result.classList.add("active");
        result.innerHTML = `Your BMI is : ${finalBmi} (${bmiCat})`;
    } else {
        this.classList.add("was-validated");
    }
};

// US form 
document.usForm.onsubmit = function (event) {
    event.preventDefault();
    if (this.checkValidity()) {
        const weight = parseFloat(document.getElementById("us-weight").value);
        const feet = parseInt(document.getElementById("us-feet").value);
        const inches = parseInt(document.getElementById("us-inches").value);
        const heightInInches = (feet * 12) + inches;
        const bmi = (weight * 703) / (heightInInches * heightInInches);
        let bmiCat = getBMICategory(bmi);
        let finalBmi = bmi.toFixed(2);
        result.classList.remove("hidden");
        result.classList.add("active");
        result.innerHTML = `Your BMI is : ${finalBmi} (${bmiCat})`;

    } else {
        this.classList.add("was-validated");
    }
};



document.querySelectorAll('input[type="reset"]').forEach(button => {
button.addEventListener('click', function () {
    resetForm(this.form); // Call resetForm on the respective form
});
});