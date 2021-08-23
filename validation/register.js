const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.phoneno = !isEmpty(data.phoneno) ? data.phoneno : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

  // Name checks
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "Full Name field is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "User Name field is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.phoneno= "Phone No field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword= "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};