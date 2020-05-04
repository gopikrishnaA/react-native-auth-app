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
          if (err) { throw err; }
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
        const token = jwt.sign(payload, keys.secretOrKey,
          {
            expiresIn: 3600 // 60 min in seconds
          });
        const response = {
          success: true,
          token: 'Bearer ' + token,
          userName: user.name,
          email: user.email,
          avatar: user.avatar,
          userId: user._id
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

// Update User function
const updateUser = (req, res, user) => {
  User.findOne({
    _id: { $ne: req.body.userId },
    email: req.body.email
  })
    .then(result => {
      if (result) {
        return res.status(400)
          .json({
            errorMessage: 'Email already exist'
          });
      } else {
        return bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) { throw err; }
            user.password = hash;
            user.name = req.body.name;
            user.email = req.body.email;
            user.avatar = req.body.avatar;
            user
              .save()
              .then(user => {
                const response = {
                  status: 'success',
                  userName: user.name,
                  email: user.email,
                  avatar: user.avatar,
                  userId: user._id
                };
                return res.status(200).json(response);
              });
          });
        });
      }
    })
    .catch(err => res.status(400).json({
      errorMessage: err.message
    }));

};

// @route POST api/users/update
// @desc update user
// @access Public
exports.update = function (req, res) {
  // Form validation
  const { errorMessage, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400)
      .json({ errorMessage });
  }
  return User.findOne({ _id: req.body.userId }).then(user => {
    if (!user) {
      res.status(400)
        .json({
          errorMessage: 'User not exist'
        });
    } else {
      updateUser(req, res, user);
    }
  })
    .catch(err => res.status(400).json({
      errorMessage: err.message
    }));
};


