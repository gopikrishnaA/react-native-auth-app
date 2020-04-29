let Joke = require('../models/jokeModel');
let Comment = require('../models/comments');

exports.createComment = function (req, res) {
  let comment = new Comment();
  comment.comment = req.body.comment;
  comment.joke_id = req.body.joke_id;
  comment.save(function (err) {
    // Check for validation error
    if (err) {
      res.json(err);
    } else {
      Joke.findOne({ id: req.body.joke_id }, function (err, joke) {
        // Check for validation error
        if (err) {
          res.send(err);
        } else {
          joke.comments.push(comment);
          joke.save();
          res.json({
            message: 'Joke comments updated...!',
            data: joke
          });
        }
      });
    }
  });
};

exports.getComments = function (req, res) {
  Comment.find({ joke_id: req.body.joke_id }, function (err, comments) {
    if (err) {
      res.json({
        status: 'error',
        message: err
      });
    }
    res.json({
      status: 'success',
      message: 'Comments retrieved successfully',
      data: comments
    });
  });
};

exports.deleteComment = function (req, res) {
  Comment.deleteMany(
    {
      _id: req.body.comment_id
    },
    function (err) {
      if (err) {res.send(err);}
      Joke.findOne({ id: req.body.joke_id }, function (err, joke) {
        // Check for validation error
        if (err) {
          res.send(err);
        } else {
          joke.comments.pull({ _id: req.body.comment_id });
          joke.save();
          res.json({
            message: 'Joke comments updated...!',
            data: joke
          });
        }
      });
    }
  );
};
