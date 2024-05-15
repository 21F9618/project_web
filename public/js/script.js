////////////////////////////////////Event Handlers for the forms//////////////////////////////////////

let login_btn_forgot = document.querySelector(".forgotPass-form .Login-btn");  //it is on Forget form. "Return to Sign-In page"
let register_btn = document.querySelector(".signup-btn");        //it is on Login page. "Create Account"
let login_btn = document.querySelector(".Login-btn");            //it is on Sign-up page, "Already have an account"
let forgot_btn = document.querySelector(".forgot-btn");          //it is on Login page. "Forot Password"
const submitBtnLogin = document.querySelector(".Login-form .submit-btn"); //main  button on Login form
const verifyButton = document.getElementById("opt_v");  //it is on the OTP form. "Verify OTP"

let form = document.querySelector(".Form-box");
let login_form_check = document.querySelector(".Login-form");
let signup_form_check = document.querySelector(".signup-form");
let forgotPass_form_check = document.querySelector(".forgotPass-form");
let otp_verify_form = document.querySelector(".otp_verify");

//////////////////////////////////// OtP Form Logic & Event Handlers ///////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  let input_otps = document.querySelectorAll(".otp_verify .otp-input");
  input_otps.forEach((input_otp, index1) => {
    input_otp.addEventListener("input", (event) => {
      const currentInput = event.target,
        nextInput = currentInput.nextElementSibling,
        prevInput = currentInput.previousElementSibling;

      if (event.inputType === "deleteContentBackward") { // Handle backspace key press
        if (currentInput.value === "" && prevInput) {
          prevInput.focus();
          disableSubsequentInputs(prevInput); // Disable subsequent inputs
        }
      }
      else {
        if (currentInput.value.length > 1) {  // Check if the value has more than one character, then clear it
          currentInput.value = currentInput.value.slice(0, 1);
          return;
        } if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {  // Enable the next input and focus on it
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        } else if (currentInput.value !== "" && nextInput) {
          nextInput.focus();
        }
      }
      if (!input_otps[input_otps.length - 1].disabled && input_otps[input_otps.length - 1].value !== "") { // Check if the last input is filled
        verifyButton.classList.add("active");
      } else {
        verifyButton.classList.remove("active");
      }
    });
  });

  function disableSubsequentInputs(currentInput) {
    let nextInput = currentInput.nextElementSibling;
    while (nextInput) {
      nextInput.setAttribute("disabled", true);
      nextInput.value = "";
      nextInput = nextInput.nextElementSibling;
    }
  }
});

let otp_val;
function sendOTP() {
  event.preventDefault();
  const email = document.getElementById("emailsignup");
  const otpInput = document.querySelector(".otp_verify .otp-input");
  otp_val = Math.floor(1000 + Math.random() * 9000);
  let emailbody = `<h2>Your OTP is ${otp_val}</h2>`;

  Email.send({
    SecureToken: "407248bd-fcaf-4ac5-9bb6-58dce7669734",
    To: email.value,
    From: "kamlasafdar23@gmail.com",
    Subject: "Email OTP verification",
    Body: emailbody,
  }).then(message => {
    if (message === "OK") {
      alert("OTP sent to your email " + email.value);
      otpInput.focus();
    }
  });
}

document.getElementById("opt_v").addEventListener("click", () => {
  event.preventDefault(); // Prevent default form submission
  const otpInputs = document.querySelectorAll(".otp_verify .otp-input");
  let otp_val_inp = ""; // Initialize an empty string to store the complete OTP
  otpInputs.forEach(input => {  // Concatenate the values of all input fields
    otp_val_inp += input.value;
  });
  otp_val_inp = parseInt(otp_val_inp);   // Convert the concatenated OTP string to an integer
  if (otp_val === otp_val_inp) {
    console.log(otp_val);
    console.log(otp_val_inp);
    alert("Account Created Successfully!");
    otp_verify_form.submit();  //let the user only proceed to the homePage when Account Created succussfully
  }
  else {
    alert("Invalid OTP. Please try again.");
    otpInputs[0].focus();      // Optionally, focus the first input field for the user to try again
  }
});

//focus the first input index is 0 on window load
window.addEventListener("load", () => input_otp[0].focus());



//////////////////////////////////////Login-In page event Handlers////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {

  submitBtnLogin.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("emaillogin").value;
    const password = document.getElementById("loginPass").value;

    if (username.trim() === '' || password.trim() === '') {
      alert("Please fill in both username and password fields.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 5 characters long and contain at least one special character.");
      return;
    }

    if (!validate_email(username)) {
      alert("Email must end with @gmail.com");
      return;
    }
    // Prepare login data
    // const loginData = {
    //   emaillogin: username,
    //   password: password
    // };

    // Send login request to the server
    // fetch('/login', {
    //   method: 'POST',
    //   body: JSON.stringify(loginData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   if (response.status === 404) {
    //     // Show a notification to the user that the user does not exist
    //     alert('User does not exist');
    //   } else if (response.ok) {
    //     // Redirect the user to the home page
    //     window.location.href = '/home';
    //   }
    // }).catch(error => {
    //   console.error('Error:', error);
    // });
     login_form_check.submit();


  });
});

register_btn.addEventListener("click", () => {
  form.classList.remove("change-form2", "change-form3"); // Remove other classes if present
  form.classList.add("change-form1");
  form.classList.add("expanded");
});

forgot_btn.addEventListener("click", () => {
  form.classList.remove("change-form1", "change-form2"); // Remove other classes if present
  form.classList.add("change-form3");
});

///////////////////////////////////////Forget Password page event Handlers///////////////////

login_btn_forgot.addEventListener("click", () => {
  form.classList.remove("expanded");
  form.classList.remove("change-form3");
});

forgotPass_form_check.addEventListener("submit", function (event) {
  event.preventDefault();
  const newPassInput = document.getElementById("newPass");
  const newPassword = newPassInput.value;
  const cnfrmPassInput = document.getElementById("cnfrmPass");
  const confirmPassword = cnfrmPassInput.value;
  const emailForgotInput=document.getElementById("emailForgot");
  const emailForgot = emailForgotInput.value;

  var passwordInput = forgotPass_form_check.querySelector('input[type="password"]');
  var password = passwordInput.value;

  if (!validatePassword(newPassword)) {
    event.preventDefault();
    alert("Password must be at least 5 characters long and contain at least one special character.");
    return;
  }
  if (!validatePassword(confirmPassword)) {
    event.preventDefault();
    alert("Password must be at least 5 characters long and contain at least one special character.");
    return;
  }
  if (!validate_email(emailForgot)) {
    alert("Email must end with @gmail.com");
    return;
  }
  else if (newPassword === confirmPassword) {
    forgotPass_form_check.submit();

    // form.classList.remove("change-form1", "change-form2");
    // form.classList.add("change-form3");
  }
  else {
    alert("Passwords do not match. Please try again.");
    return;
  }
});

////////////////////////////////////////Sign-Up page event Handlers///////////////////

login_btn.addEventListener("click", () => {
  form.classList.remove("change-form1", "change-form3"); // Remove other classes if present
  form.classList.add("change-form2");
  form.classList.remove("expanded");
});

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".Form-box");
  // Hide OTP verification form initially
  otp_verify_form.classList.add("hide");

  signup_form_check.addEventListener("submit", function (event) {
    event.preventDefault();
    var passwordInput = signup_form_check.querySelector('input[type="password"]');
    var emailInput = document.getElementById("emailsignup");
    var phoneInput = document.getElementById("pn");
    var password = passwordInput.value;
    var email_signup = emailInput.value;
    var temp_phone = phoneInput.value;

    if (!validate_email(email_signup)) {
      alert("Email must end with @gmail.com");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 5 characters long and contain at least one special character.");
      return;
    }
    if (!validate_phone(temp_phone)) {
      alert("Your phone number is not in the right format. Your phone number should have exactly 12 digits");
      return;
    }
    // If all validations pass, show the OTP verification form
    otp_verify_form.classList.remove("hide");
    form.classList.remove("change-form1", "change-form2", "change-form3"); // Remove other classes if present
    form.classList.add("change-form4");
    signup_form_check.submit();
  });
});


/////////////////////////////////////validation functions for the fields//////////////

function validate_email(email) {
  var emailregex = /@gmail.com$/;
  return emailregex.test(email);
}

function validatePassword(password) {
  var specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (password.length < 5 || !specialCharacterRegex.test(password)) {
    return false;
  }
  return true;
}

function validate_phone(phone_no) {
  var phoneregix = /^\d{11}/;
  return phoneregix.test(phone_no);
}

