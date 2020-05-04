// api-routes.js
// Initialize express router
const router = require('express').Router();
// authenticator
const authenticateJWT = require('./authenticator').authenticateJWT;

// Import contact controller
const userController = require('./controllers/userController');
const jokeController = require('./controllers/jokeController');
const commentController = require('./controllers/commentController');

// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!'
  });
});

// Contact routes
router
  .route('/user/registration')
  .post(userController.register);
router
  .route('/user/login')
  .post(userController.login);
router
  .route('/user/update')
  .post(authenticateJWT, userController.update);
router
  .route('/joke')
  .get(authenticateJWT, jokeController.getJoke);
router
  .route('/jokes')
  .get(authenticateJWT, jokeController.index)
  .post(authenticateJWT, jokeController.new);
router
  .route('/jokes/:joke_id')
  .get(authenticateJWT, jokeController.view)
  .put(authenticateJWT, jokeController.update)
  .delete(authenticateJWT, jokeController.delete);
router
  .route('/jokes/delete')
  .post(authenticateJWT, jokeController.deleteSelected);
router
  .route('/jokes/comments')
  .post(authenticateJWT, commentController.getComments);
router
  .route('/jokes/addComment')
  .post(authenticateJWT, commentController.createComment);
router
  .route('/jokes/deleteComment')
  .post(authenticateJWT, commentController.deleteComment);

// Export API routes
module.exports = router;
