const jwt = require('jsonwebtoken');
const accessTokenSecret = require('./config/keys').secretOrKey;

exports.authenticateJWT = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).send({
          errorMessage: 'Session expired'
        });
      }
      req.user = user;
      return next();
    });
  } else {
    res.status(401).send({
      errorMessage: 'jwt must be provided'
    });
  }
};
