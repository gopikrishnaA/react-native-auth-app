const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput (data) {
  let errorMessage = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errorMessage = 'Name field is required';
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errorMessage = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errorMessage = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errorMessage = 'Password field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    errorMessage = 'Confirm password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errorMessage = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errorMessage = 'Passwords must match';
  }
  return {
    errorMessage,
    isValid: isEmpty(errorMessage)
  };
};
