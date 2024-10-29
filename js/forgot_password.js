let generatedOTP;

        function generateOTP() {
            const phoneInput = document.getElementById("phoneInput").value;
            if (phoneInput) {
                generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
                alert("Your OTP is: " + generatedOTP); 
                document.getElementById("otpSection").style.display = "block";
            } else {
                alert("Please enter a phone number.");
            }
        }

        function verifyOTP() {
            const enteredOTP = document.getElementById("otpInput").value;
            if (enteredOTP === generatedOTP) {
                document.getElementById("otpContainer").style.display = "none";
                document.getElementById("resetPasswordContainer").style.display = "block";
            } else {
                alert("Incorrect OTP. Please try again.");
            }
        }

        function resetPassword() {
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (newPassword && confirmPassword) {
                if (newPassword === confirmPassword) {
                    alert("Password successfully reset!");
                   
                } else {
                    alert("Passwords do not match. Please try again.");
                }
            } else {
                alert("Please fill in both password fields.");
            }
        }