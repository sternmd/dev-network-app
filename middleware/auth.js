const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function that has access to req/res
module.exports = function (req, res, next) {
  // get token from the header
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied.'
    })
  }

  // if token exists, then verify
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      mes: 'Token is not valid.'
    })
  }
}
