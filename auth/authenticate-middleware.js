/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, "Everygoodboydoesfine", (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Failed to authenticate" });
  }
}