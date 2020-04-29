const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/user');

// @route POST api/users/register
// @desc Register user
// @access Public
exports.register = function (req, res) {
  // Form validation

  const { errorMessage, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400)
              .json({ errorMessage });
  }

  return User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400)
                .json({ errorMessage: 'Email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      return bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {throw err;}
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json({ status: 'success', user }))
            .catch(err => console.info(err));
        });
      });
    }
  });
};

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
exports.login = function (req, res) {
  // Form validation
const { errorMessage, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400)
              .json({ errorMessage });
  }

  const email = req.body.email;
  const password = req.body.password;

// Find user by email
  return User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404)
                .json({ errorMessage: 'Email not found' });
    }
    // Check password
    return bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email
        };
      // Sign token
        const token = jwt.sign(payload,keys.secretOrKey,
          {
            expiresIn: 300 // 5 min in seconds
          });
          const response = {
            success: true,
            token: 'Bearer ' + token
        };
        return res.status(200).json(response);
      } else {
        return res
          .status(400)
          .json({ errorMessage: 'Password incorrect' });
      }
    });
  });
};
