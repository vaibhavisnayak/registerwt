function validateForm() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // ^([A-Za-z])\w+$ ->name
    // ^\+91\s[0-9]{10}$ ->mob
    // ^[A-Za-z0-9]+@(gmail|manipal|yahoo|hotmail)\.(com|org|edu)$ ->email
    // ^([A-Za-z0-9.]+\s?){1,50}$ -> message
}