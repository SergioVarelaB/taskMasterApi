const User = require('../Models/User/user.model').User
const jwt = require('jsonwebtoken')


async function validateToken(req, res, next) {
    const auhorizationHeader = req.headers.authorization;
    let result;
    const email = req.body.email;
  
    if (!auhorizationHeader) {
      return res.status(401).json({
        error: true,
        message: "Access token is missing",
      });
    }
  
    const token = req.headers.authorization.split(" ")[1];
  
    const options = {
      expiresIn: "24h",
    };
  
    try {
      let user = await User.findOne({
        accessToken: token,
      });
 
      if (!user) {
        result = {
          error: true,
          message: "Authorization error",
        };
  
        return res.status(403).json(result);
      }
  
      result = jwt.verify(token, "secret-key-shhhh", options);

      console.log(result)
  
      if (!user.username === result.username) {
        result = {
          error: true,
          message: "Invalid token",
        };
  
        return res.status(401).json(result);
      }
  
      req.decoded = result;
  
      next();
    } catch (error) {
      console.error(error);
  
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({
          error: true,
          message: "Token expired",
        });
      }
  
      return res.status(403).json({
        error: true,
        message: "Authentication error",
      });
    }
  }
  
module.exports = {
  validateToken,
}