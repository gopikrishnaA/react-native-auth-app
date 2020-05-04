// jokeController.js
// Import joke model
let Joke = require('../models/jokeModel');
let Comment = require('../models/comments');
const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://icanhazdadjoke.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Handle Third party api.
// common for all users
exports.getJoke = async (req, res) => {
  try {
    const response = await axiosInstance.get('/');
    res.json({
      status: 'success',
      message: 'Joke retrieved successfully',
      data: response.data
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error
    });
  }
};

// Handle index actions
exports.index = function (req, res) {
  Joke.find({ userId: req.user.id }, function (err, Jokes) {
    if (err) {
      res.json({
        status: 'error',
        message: err
      });
    }
    res.json({
      status: 'success',
      message: 'Jokes retrieved successfully',
      data: Jokes
    });
  });
};
// Handle create joke actions
exports.new = function (req, res) {
  let joke = new Joke();
  joke.id = req.body.id;
  joke.joke = req.body.joke;
  joke.status = req.body.status;
  joke.userId = req.user.id;
  // save the joke and check for errors
  joke.save(function (err) {
    // Check for validation error
    if (err) { res.json(err); }
    else {
      res.json({
        message: 'New joke created!',
        data: joke
      });
    }
  });
};
// Handle view joke info
exports.view = function (req, res) {
  Joke.findOne({ id: req.params.joke_id }, function (err, joke) {
    if (err) { res.send(err); }
    res.json({
      message: 'Joke details loading..',
      data: joke
    });
  });
};
// Handle update joke info
exports.update = function (req, res) {
  Joke.findOne({ id: req.params.joke_id }, function (err, joke) {
    if (err) { res.send(err); }
    joke.status = req.body.status;
    joke.create_date = Date.now();
    // save the joke and check for errors
    joke.save(function (err) {
      if (err) { res.json(err); }
      res.json({
        message: 'Joke Info updated',
        data: joke
      });
    });
  });
};

exports.delete = function (req, res) {
  Joke.deleteOne(
    {
      id: req.params.joke_id
    },
    function (err, joke) {
      if (err) { res.send(err); }
      Comment.deleteMany(
        {
          joke_id: req.params.joke_id
        },
        function (err, comments) {
          if (err) { res.send(err); }
          res.json({
            status: 'success',
            message: 'Joke deleted',
            data: { joke, comments }
          });
        }
      );
    }
  );
};

exports.deleteSelected = function (req, res) {
  // delete the selcted jokes and check for errors
  Joke.deleteMany(
    {
      id: req.body.items
    },
    function (err, joke) {
      if (err) { res.send(err); }
      Comment.deleteMany(
        {
          joke_id: req.body.items
        },
        function (err, comments) {
          if (err) { res.send(err); }
          res.json({
            status: 'success',
            message: 'Jokes deleted',
            data: { joke, comments }
          });
        }
      );
    }
  );
};
