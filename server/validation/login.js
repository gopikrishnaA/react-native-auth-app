const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateLoginInput (data) {
  let errorMessage = '';
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
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
  return {
    errorMessage,
    isValid: isEmpty(errorMessage)
  };
};
